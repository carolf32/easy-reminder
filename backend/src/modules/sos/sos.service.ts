import { injectable } from "tsyringe";
import { TSOSLocationData } from "./sos.schema";
import { prisma } from "../../config/prisma";
import twilio from "twilio";
import { ApiError } from "../utils/ApiError";
import { TUser, TUserBasic } from "../users/user.schema";

@injectable()
export class SOSService {
  private twilioClient: twilio.Twilio | null = null;

  constructor() {
    // Inicializar Twilio apenas se as credenciais existirem
    if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) {
      this.twilioClient = twilio(
        process.env.TWILIO_ACCOUNT_SID,
        process.env.TWILIO_AUTH_TOKEN
      );
      console.log("✅ Twilio client initialized");
    } else {
      console.warn("⚠️ Twilio credentials not found - SMS will not be sent");
    }
  }

  async triggerSOS(userId: number, location: TSOSLocationData) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        emergencyContactName: true,
        emergencyContactPhone: true,
      },
    });

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    if (!user.emergencyContactPhone) {
      throw new ApiError(400, "Emergency contact phone not set");
    }

    const sosEvent = await prisma.sOSEvent.create({
      data: {
        userId: user.id,
        latitude: location.latitude,
        longitude: location.longitude,
      },
    });

    // Tentar enviar SMS apenas se o Twilio estiver configurado
    if (this.twilioClient) {
      try {
        await this.sendEmergencySMS(user, location);
      } catch (error) {
        console.error("❌ Error sending emergency SMS:", error);
      }
    } else {
      console.warn("⚠️ SMS not sent - Twilio not configured");
    }

    return {
      success: true,
      eventId: sosEvent.id,
      message: "Emergency alert sent successfully",
      contactNotified: user.emergencyContactPhone,
      location: {
        latitude: location.latitude,
        longitude: location.longitude,
        mapsUrl: `https://www.google.com/maps?q=${location.latitude},${location.longitude}`,
      },
      timestamp: sosEvent.createdAt,
    };
  }

  private async sendEmergencySMS(user: TUserBasic, location: TSOSLocationData) {
    if (!this.twilioClient) {
      throw new Error("Twilio client not initialized");
    }

    const googleMapsUrl = `https://www.google.com/maps?q=${location.latitude},${location.longitude}`;

    const message = await this.twilioClient.messages.create({
      body: `🚨 SOS URGENT - ${
        user.name
      } triggered the emergency button!\n\n📍 Location: ${googleMapsUrl}\n⏰ Time: ${new Date().toLocaleString(
        "pt-PT"
      )}\n\nPlease contact immediately!`,
      to: user.emergencyContactPhone!,
      from: process.env.TWILIO_PHONE_NUMBER,
    });
    console.log(`✅ SMS sent to ${user.emergencyContactPhone}:`, message.sid);
    return message;
  }

  async getSOSHistory(userId: number) {
    const sosEvents = await prisma.sOSEvent.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        latitude: true,
        longitude: true,
        createdAt: true,
      },
    });
    return sosEvents;
  }
}

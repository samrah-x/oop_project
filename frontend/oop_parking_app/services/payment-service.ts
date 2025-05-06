import apiClient from "../../utils/api-client"
import type { ApiResponse, Payment, PaymentCard, PaymentRequest } from "../types"

class PaymentService {
  /**
   * Process a payment
   */
  async processPayment(paymentData: PaymentRequest): Promise<Payment> {
    try {
      const response = await apiClient.post<ApiResponse<Payment>>("/payments", paymentData)

      if (!response.data.success || !response.data.data) {
        throw new Error(response.data.error?.message || "Payment processing failed")
      }

      return response.data.data
    } catch (error: any) {
      console.error("Process payment error:", error.response?.data || error.message)
      throw error
    }
  }

  /**
   * Get user's saved payment cards
   */
  async getSavedCards(): Promise<PaymentCard[]> {
    try {
      const response = await apiClient.get<ApiResponse<PaymentCard[]>>("/payments/cards")

      if (!response.data.success || !response.data.data) {
        throw new Error(response.data.error?.message || "Failed to get saved cards")
      }

      return response.data.data
    } catch (error: any) {
      console.error("Get saved cards error:", error.response?.data || error.message)
      throw error
    }
  }

  /**
   * Add a new payment card
   */
  async addPaymentCard(cardData: {
    cardholderName: string
    cardNumber: string
    expiryMonth: string
    expiryYear: string
    cvv: string
    setDefault?: boolean
  }): Promise<PaymentCard> {
    try {
      const response = await apiClient.post<ApiResponse<PaymentCard>>("/payments/cards", cardData)

      if (!response.data.success || !response.data.data) {
        throw new Error(response.data.error?.message || "Failed to add payment card")
      }

      return response.data.data
    } catch (error: any) {
      console.error("Add payment card error:", error.response?.data || error.message)
      throw error
    }
  }

  /**
   * Delete a payment card
   */
  async deletePaymentCard(cardId: string): Promise<void> {
    try {
      const response = await apiClient.delete<ApiResponse<void>>(`/payments/cards/${cardId}`)

      if (!response.data.success) {
        throw new Error(response.data.error?.message || "Failed to delete payment card")
      }
    } catch (error: any) {
      console.error("Delete payment card error:", error.response?.data || error.message)
      throw error
    }
  }

  /**
   * Set a card as default
   */
  async setDefaultCard(cardId: string): Promise<PaymentCard> {
    try {
      const response = await apiClient.put<ApiResponse<PaymentCard>>(`/payments/cards/${cardId}/default`)

      if (!response.data.success || !response.data.data) {
        throw new Error(response.data.error?.message || "Failed to set default card")
      }

      return response.data.data
    } catch (error: any) {
      console.error("Set default card error:", error.response?.data || error.message)
      throw error
    }
  }

  /**
   * Get payment history
   */
  async getPaymentHistory(): Promise<Payment[]> {
    try {
      const response = await apiClient.get<ApiResponse<Payment[]>>("/payments/history")

      if (!response.data.success || !response.data.data) {
        throw new Error(response.data.error?.message || "Failed to get payment history")
      }

      return response.data.data
    } catch (error: any) {
      console.error("Get payment history error:", error.response?.data || error.message)
      throw error
    }
  }
}

export default new PaymentService()

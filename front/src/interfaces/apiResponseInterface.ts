export interface ApiResponse {
    success: boolean
    data: Record<string, unknown> | { message: string }
}

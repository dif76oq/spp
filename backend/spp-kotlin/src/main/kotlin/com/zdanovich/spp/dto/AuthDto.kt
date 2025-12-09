package com.zdanovich.spp.dto

data class AuthRegisterRequest(
    val login: String,
    val password: String
)

data class AuthLoginRequest(
    val login: String,
    val password: String
)

data class AuthTokenResponse(
    val token: String,
    val login: String,
    val role: String
)


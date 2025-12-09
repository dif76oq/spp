package com.zdanovich.spp.controller

import com.zdanovich.spp.dto.AuthLoginRequest
import com.zdanovich.spp.dto.AuthRegisterRequest
import com.zdanovich.spp.dto.AuthTokenResponse
import com.zdanovich.spp.service.AuthService
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/auth")
class AuthController(private val authService: AuthService) {

    @PostMapping("/register")
    fun register(@RequestBody request: AuthRegisterRequest): AuthTokenResponse =
        authService.register(request)

    @PostMapping("/login")
    fun login(@RequestBody request: AuthLoginRequest): AuthTokenResponse =
        authService.login(request)
}


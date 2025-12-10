package com.zdanovich.spp.service

import com.zdanovich.spp.dto.AuthLoginRequest
import com.zdanovich.spp.dto.AuthRegisterRequest
import com.zdanovich.spp.dto.AuthTokenResponse
import com.zdanovich.spp.entity.UserEntity
import com.zdanovich.spp.exception.BadRequestException
import com.zdanovich.spp.repository.UserRepository
import com.zdanovich.spp.security.JwtService
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service

@Service
class AuthService(
    private val userRepository: UserRepository,
    private val passwordEncoder: PasswordEncoder,
    private val jwtService: JwtService
) {
    fun register(request: AuthRegisterRequest): AuthTokenResponse {
        val trimmedLogin = request.login.trim()
        if (trimmedLogin.isEmpty()) {
            throw BadRequestException("Логин не может быть пустым")
        }

        if (request.password.length < 6) {
            throw BadRequestException("Пароль должен содержать минимум 6 символов")
        }

        if (userRepository.findByLogin(trimmedLogin) != null) {
            throw BadRequestException("Пользователь с логином $trimmedLogin уже существует")
        }

        val user = UserEntity(
            login = trimmedLogin,
            password = passwordEncoder.encode(request.password),
            role = "ROLE_MEMBER"
        )

        val saved = userRepository.save(user)
        val token = jwtService.generateToken(saved)
        return AuthTokenResponse(token = token, login = saved.login, role = saved.role)
    }

    fun login(request: AuthLoginRequest): AuthTokenResponse {
        val trimmedLogin = request.login.trim()
        val user = userRepository.findByLogin(trimmedLogin)
            ?: throw BadRequestException("Неверный логин или пароль")

        if (!passwordEncoder.matches(request.password, user.password)) {
            throw BadRequestException("Неверный логин или пароль")
        }

        val token = jwtService.generateToken(user)
        return AuthTokenResponse(token = token, login = user.login, role = user.role)
    }
}


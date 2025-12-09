package com.zdanovich.spp.security

import org.springframework.security.access.AccessDeniedException
import org.springframework.security.core.context.SecurityContextHolder

object SecurityUtil {

    fun currentLogin(): String? =
        SecurityContextHolder.getContext().authentication?.name

    fun currentRoles(): List<String> =
        SecurityContextHolder.getContext().authentication?.authorities
            ?.map { it.authority }
            ?: emptyList()

    fun isAdmin(): Boolean {
        return currentRoles().any { it == "ROLE_ADMIN" }
    }

    fun requireAuthenticated(): String =
        currentLogin() ?: throw AccessDeniedException("Требуется авторизация")
}


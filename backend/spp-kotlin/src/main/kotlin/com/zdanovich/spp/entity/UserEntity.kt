package com.zdanovich.spp.entity

import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document

@Document("users")
data class UserEntity(
    @Id
    var id: String? = null,
    var login: String,
    var password: String,
    var role: String
)


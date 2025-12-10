package com.zdanovich.spp.repository

import com.zdanovich.spp.entity.UserEntity
import org.springframework.data.mongodb.repository.MongoRepository
import org.springframework.stereotype.Repository

@Repository
interface UserRepository : MongoRepository<UserEntity, String> {
    fun findByLogin(login: String): UserEntity?
}


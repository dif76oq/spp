package com.zdanovich.spp.repository

import com.zdanovich.spp.entity.TaskEntity
import org.springframework.data.mongodb.repository.MongoRepository
import org.springframework.stereotype.Repository

@Repository
interface TaskRepository : MongoRepository<TaskEntity, String> {
    fun findByProjectId(projectId: String): List<TaskEntity>
    fun deleteByProjectId(projectId: String)
}


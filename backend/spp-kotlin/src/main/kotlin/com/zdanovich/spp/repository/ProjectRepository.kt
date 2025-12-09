package com.zdanovich.spp.repository

import com.zdanovich.spp.entity.ProjectEntity
import org.springframework.data.mongodb.repository.MongoRepository
import org.springframework.stereotype.Repository

@Repository
interface ProjectRepository : MongoRepository<ProjectEntity, String>


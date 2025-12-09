package com.zdanovich.spp.entity

import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document

@Document("projects")
data class ProjectEntity(
    @Id
    var id: String? = null,
    var name: String,
    var description: String? = null,
    var members: MutableList<String> = mutableListOf()
)


package com.zdanovich.spp.dto

data class ProjectCreateRequest(
    val name: String,
    val description: String? = null,
    val members: List<String> = emptyList()
)

data class ProjectUpdateRequest(
    val name: String,
    val description: String? = null,
    val members: List<String> = emptyList()
)

data class ProjectResponse(
    val id: String,
    val name: String,
    val description: String?,
    val members: List<String>,
    val tasks: List<TaskResponse>
)


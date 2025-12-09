package com.zdanovich.spp.dto

data class TaskCreateRequest(
    val title: String,
    val description: String? = null,
    val status: String? = null,
    val assignee: String? = null
)

data class TaskUpdateRequest(
    val title: String,
    val description: String? = null,
    val status: String? = null,
    val assignee: String? = null
)

data class TaskResponse(
    val id: String,
    val title: String,
    val description: String,
    val status: String,
    val assignee: String,
    val projectId: String
)


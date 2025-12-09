package com.zdanovich.spp.entity

import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document

@Document("tasks")
data class TaskEntity(
    @Id
    var id: String? = null,
    var title: String,
    var description: String? = null,
    var status: TaskStatus = TaskStatus.TODO,
    var assignee: String? = null,
    var projectId: String
)


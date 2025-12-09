package com.zdanovich.spp.service

import com.zdanovich.spp.dto.TaskResponse
import com.zdanovich.spp.entity.TaskEntity

internal fun TaskEntity.toResponse(): TaskResponse =
    TaskResponse(
        id = requireNotNull(id),
        title = title,
        description = description.orEmpty(),
        status = status.label,
        assignee = assignee.orEmpty(),
        projectId = projectId
    )


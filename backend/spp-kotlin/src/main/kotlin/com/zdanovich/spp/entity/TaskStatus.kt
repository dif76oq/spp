package com.zdanovich.spp.entity

import com.fasterxml.jackson.annotation.JsonCreator
import com.fasterxml.jackson.annotation.JsonValue

enum class TaskStatus(val label: String) {
    TODO("todo"),
    IN_PROGRESS("in progress"),
    DONE("done");

    companion object {
        @JsonCreator
        @JvmStatic
        fun fromLabel(label: String?): TaskStatus =
            values().firstOrNull { it.label.equals(label, ignoreCase = true) } ?: TODO
    }

    @JsonValue
    fun toLabel(): String = label
}


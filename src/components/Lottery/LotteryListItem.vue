<script setup>
import { formatDate } from "@/utils/date";

const props = defineProps({
  lottery: {
    type: Object,
    required: true,
  },
  isInProcess: Boolean,
});

const emit = defineEmits(["open-status", "edit", "delete"]);

const isAnnounceDateReady = (date) => new Date() >= date;
</script>

<template>
  <v-list-item class="lottery-item px-4 py-4">
    <div class="status-row d-flex ga-2 mb-3">
      <template v-for="(status, key) in props.lottery.status" :key="key">
        <template v-if="status == 0 && props.isInProcess">
          <v-btn
            v-if="isAnnounceDateReady(props.lottery.announceDates[key])"
            class="lottery-status-chip"
            size="small"
            color="warning"
            variant="flat"
            rounded="pill"
            prepend-icon="mdi-gift-outline"
            @click="emit('open-status', props.lottery.id, key)"
          >
            開獎
          </v-btn>
          <v-chip
            v-else
            class="lottery-status-chip"
            size="small"
            color="info"
            variant="tonal"
            rounded="pill"
            prepend-icon="mdi-clock-outline"
          >
            尚未
          </v-chip>
        </template>
        <v-chip
          v-if="status == 1"
          class="lottery-status-chip"
          size="small"
          color="success"
          variant="tonal"
          rounded="pill"
          prepend-icon="mdi-check-circle-outline"
        >
          中獎
        </v-chip>
        <v-chip
          v-if="status == 2"
          class="lottery-status-chip"
          size="small"
          color="error"
          variant="tonal"
          rounded="pill"
          prepend-icon="mdi-close-circle-outline"
        >
          未中
        </v-chip>
      </template>
    </div>

    <div class="lottery-item-content">
      <div class="lottery-title">{{ props.lottery.title }}</div>
      <div class="lottery-details">
        <div>
          <span class="detail-label">活動日期</span>{{ formatDate(props.lottery.startDate) }} ~
          {{ formatDate(props.lottery.endDate) }}
        </div>
        <div>
          <span class="detail-label">公布日期</span>
          {{ props.lottery.announceDates.map((date) => formatDate(date)).join(", ") }}
        </div>
        <div>
          <span class="detail-label">建立日期</span>{{ formatDate(props.lottery.createdAt, "yyyy-MM-dd HH:mm:ss") }}
        </div>
      </div>
      <div class="lottery-award"><span class="detail-label">獎項</span>{{ props.lottery.award }}</div>
    </div>

    <template #append>
      <div v-if="props.isInProcess" class="action-buttons d-flex ga-2">
        <v-btn
          variant="tonal"
          color="primary"
          prepend-icon="mdi-pencil-outline"
          @click="emit('edit', props.lottery.id)"
        >
          修改
        </v-btn>
        <v-btn variant="text" color="error" prepend-icon="mdi-delete-outline" @click="emit('delete', props.lottery.id)">
          刪除
        </v-btn>
      </div>
    </template>
  </v-list-item>
</template>

<style scoped>
.lottery-item {
  align-items: start;
}

.lottery-item-content {
  min-width: 0;
  flex: 1 1 420px;
  padding-right: 20px;
}

.status-row {
  width: 100%;
  flex-wrap: wrap;
}

.lottery-status-chip {
  width: 88px;
  min-width: 88px;
  justify-content: center;
  padding-inline: 12px;
}

.lottery-status-chip :deep(.v-chip__content) {
  justify-content: center;
}

.lottery-title {
  overflow: hidden;
  font-size: 18px;
  font-weight: 500;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.lottery-details,
.lottery-award {
  color: rgba(235, 235, 235, 0.68);
  font-size: 16px;
  line-height: 1.7;
}

.lottery-details {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  column-gap: 20px;
  row-gap: 6px;
  margin-top: 6px;
}

.lottery-details > div {
  min-width: 0;
}

.lottery-award {
  display: -webkit-box;
  margin-top: 4px;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.detail-label {
  display: block;
  color: rgba(235, 235, 235, 0.48);
  font-size: 12px;
  line-height: 1.5;
}

.action-buttons {
  flex: 0 0 auto;
}

.lottery-item :deep(.v-list-item__append) {
  margin-left: 24px;
}

@media (max-width: 599px) {
  .lottery-item-content {
    padding-right: 0;
  }

  .lottery-details {
    display: block;
  }

  .lottery-details > div {
    margin-top: 4px;
  }

  .lottery-item {
    grid-template-areas: "content" "append";
    grid-template-columns: 1fr;
  }

  .lottery-title {
    white-space: normal;
  }

  .lottery-item :deep(.v-list-item__append) {
    width: 100%;
    margin-top: 16px;
    margin-left: 0;
  }

  .action-buttons {
    width: 100%;
  }

  .action-buttons .v-btn {
    flex: 1;
  }
}

@media (min-width: 600px) and (max-width: 959px) {
  .lottery-details {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>

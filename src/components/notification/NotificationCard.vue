<template>
  <div class="notification-item" :class="{ disabled }">
    <div v-show="!read" class="notification-item__unread unread" :class="type" />

    <div class="notification-item__content">
      <div class="icon">
        <div class="icon__child" :class="'icon__' + type">
          <i
            v-if="type == 'task'"
            class="icon icon-ic_fluent_clipboard_bullet_list_ltr_20_regular"
          />
          <i v-else-if="type == 'group'" class="icon icon-ic_fluent_people_team_20_regular" />

          <i v-else-if="type == 'request'" class="icon icon-ic_fluent_image_20_regular" />
          <i v-else-if="type == 'user'" class="icon icon-ic_fluent_person_20_regular" />
          <i v-else-if="type == 'info'" class="icon icon-ic_fluent_person_20_regular" />
        </div>
      </div>
      <div class="notification-item__info">
        <div class="notification-item__info__message">
          {{ message }}
        </div>
        <div class="notification-item__info__date">Дата и время: {{ date.toLocaleString() }}</div>
      </div>
    </div>

    <div class="notification-buttons">
      <AppButton
        v-if="!read"
        content-type="icon"
        tooltip="Отметить как прочитанное"
        class="notification-button"
        @click="$emit('read')"
      >
        <i class="icon icon-ic_fluent_checkmark_20_regular" />
      </AppButton>
      <AppButton
        content-type="icon"
        color="gradient-white-red"
        tooltip="Удалить"
        class="notification-button"
        @click="$emit('delete')"
      >
        <i class="icon icon-ic_fluent_delete_20_regular" />
      </AppButton>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ message: string; read: boolean; type: string; disabled: boolean; date: Date }>();
defineEmits(['read', 'delete']);
</script>

<style lang="scss" scoped>
.icon {
  border-radius: 10px;

  &__child {
    padding: 4px;
    border-radius: 10px;
    display: flex;
    font-size: 30px;
    color: $white;
  }

  &__task {
    background: $text-green;
  }

  &__group {
    background: $text-plum;
  }

  &__request {
    background: $text-blue;
  }
  &__user {
    background: $text-yellow;
  }
}

.notification {
  &-item {
    position: relative;

    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    padding: 10px 15px;

    border-radius: 10px;
    background: $white;
    box-shadow: $shadow-big;
    &.disabled {
      &::after {
        content: '';
        border-radius: 10px;
        position: absolute;
        width: 100%;
        height: 100%;
        background: rgba(#eee, 0.65);
        top: 0;
        left: 0;
      }
    }

    &__task {
      color: $text-green;
    }

    &__group {
      color: $text-plum;
    }

    &__request {
      color: $text-blue;
    }
    &__user {
      color: $text-yellow;
    }

    &__content {
      display: flex;
    }

    &__unread {
      position: absolute;
      top: -4px;
      left: -4px;
      z-index: 10;
    }

    &__img {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 40px;
      height: 40px;
      border-radius: 10px;

      img {
        max-width: 24px;
      }
    }

    &__info {
      font-size: 14px;
      color: $text-grey;
      font-weight: 400;
      margin: 0 15px;
      &__date {
        font-size: 12px;
      }
    }

    &__trash {
      width: 35px;
      height: 35px;
      margin-left: auto;
      padding: 0;

      font-size: 20px;
      border-radius: 10px;
    }
  }

  &-buttons {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  &-button {
    margin-right: 10px;
    &:last-child {
      margin-right: 0;
    }
  }
}

.unread {
  width: 12px;
  height: 12px;
  background: $gradient;
  border-radius: 50%;
}

.task {
  background: $text-green;
}

.group {
  background: $text-plum;
}
.user {
  background: $text-yellow;
}
.request {
  background: $text-blue;
}

@media screen and (max-width: 1440px) {
  .notification {
    &-item {
      margin-bottom: 16px;
      padding: 8px;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}
</style>

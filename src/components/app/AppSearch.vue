<template>
  <div class="component">
    <form class="component-form" @submit.prevent>
      <div class="component-form__item" v-if="searchOptions">
        <AppButton
          class="component-button component-button__clear"
          color="white"
          size="small"
          @click="onClear()"
          :disabled="disabled"
        >
          Сбросить
        </AppButton>
      </div>

      <div class="component-form__item" v-if="sortOptions">
        <AppSelect
          ref="sort-select"
          label="Сортировать:"
          size="small"
          class="component-form__input"
          @change="onSortSelect"
          :options="sortOptions"
          :selected="sortFieldFromProps"
          :disabled="disabled"
        />

        <AppButton
          class="component-form__input"
          size="small"
          content-type="icon"
          color="white"
          @click="onDescChange"
          :disabled="disabled"
        >
          <i
            class="icon icon-ic_fluent_data_bar_horizontal_20_regular"
            :class="{ desc }"
          ></i>
        </AppButton>
      </div>

      <div class="component-form__item" v-if="searchOptions">
        <AppSelect
          ref="search-select"
          label="Поиск:"
          class="component-form__input"
          @change="searchField = $event"
          size="small"
          :options="searchOptions"
          :disabled="disabled"
          :selected="searchFieldFromProps"
          :value="searchField"
        />

        <AppInput
          class="component-form__input"
          :value="searchValue"
          size="small"
          @input="searchValue = $event"
          :disabled="disabled"
        ></AppInput>

        <AppButton
          class="component-form__input"
          content-type="icon"
          color="white"
          size="small"
          @click="$emit('search', { field: searchField, value: searchValue })"
          :disabled="disabled"
        >
          <i class="icon icon-ic_fluent_search_20_regular"></i>
        </AppButton>
      </div>
    </form>
    <div class="component-form__actions">
      <slot name="actions"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: ["searchOptions", "sortOptions", "disabled", "searchBy", "sortBy"],

  data: () => ({
    searchField: null,
    sortField: null,
    searchValue: null,
    desc: false,
  }),

  computed: {
    searchFieldFromProps() {
      let res = null;
      if (this.searchBy) {
        this.searchOptions.forEach((el, i) => {
          if (el.value == this.searchBy.field) {
            res = i;
          }
        });
      }
      return res;
    },
    sortFieldFromProps() {
      let res = null;
      if (this.sortBy) {
        this.sortOptions.forEach((el, i) => {
          if (el.value == this.sortBy.field) {
            res = i;
          }
        });
      }
      return res;
    },
  },

  methods: {
    onSortSelect(field) {
      this.sortField = field;
      this.$emit("sort", {
        field: this.sortField,
        desc: this.desc,
      });
    },

    onDescChange() {
      this.desc = !this.desc;
      this.$emit("sort", {
        field: this.sortField,
        desc: this.desc,
      });
    },

    onClear() {
      this.$emit("clear");
    },
  },
  watch: {
    searchBy() {
      if (this.searchBy) {
        this.searchValue = this.searchBy.value;
        this.searchField = this.searchBy.field;
      } else {
        this.searchValue = null;
        this.searchField = null;
      }
    },
    sortBy() {
      if (this.sortBy) {
        this.sortField = this.sortBy.field;
        this.desc = this.sortBy.desc;
      }
    },
  },
  mounted() {
    if (this.searchBy) {
      this.searchValue = this.searchBy.value;
      this.searchField = this.searchBy.field;
    } else {
      this.searchField = this.searchOptions?.[0]?.value;
    }
    if (this.sortBy) {
      this.sortField = this.sortBy.field;
      this.desc = this.sortBy.desc;
    } else {
      this.sortField = this.sortOptions?.[0]?.value;
    }
  },
};
</script>

<style lang="scss" scoped>
.component {
  margin-bottom: 15px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;

  &-form {
    height: auto;
    &__title {
      font-size: 16px;
      color: #333;
      margin-bottom: 5px;
    }

    &__item {
      margin-bottom: 10px;
      margin-right: 30px;
      display: flex;
      align-items: center;

      &:last-child {
        margin-bottom: 0;
      }
    }

    &__input {
      margin-right: 7px;

      .desc {
        transform: scale(1, -1);
      }

      &:last-child {
        margin-right: 0;
      }
    }
  }
}
</style>

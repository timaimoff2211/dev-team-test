<template>
  <div class="card person-card" :class="{'is-view': !isView}">
    <div class="person-card__img">
      <div class="tags">
        <div 
          class="tag"
          :style="{background: `#${tag.Color}`}"
          v-for="tag, tagIdx in person.Tags" :key="tagIdx+tag.Color"
        >
          {{ tag.Name }}
        </div>
      </div>
      <img :src="person.Photo" :alt="person.Name" class="person-avtr">
    </div>
    <div class="person-card__name p-2">
      <p class="m-0 p-0" v-if="!isView" @click="$emit('onPersonClick', person.Id)">{{person.Name}}</p>
      <p class="m-0 p-0" v-else>{{person.Name}}</p>
      <p class="m-0 p-0 person-card__name-pos">{{person.Title}}</p>
    </div>
    <div class="px-2 pb-3">
      <div class="line"></div>
    </div>

    <div class="person-card__profit px-2 mb-2">
      <div class="row justify-content-between">
        <div class="col">
          <span>Profit</span>
        </div>
        <div class="col text-right">
          <span>${{ person.Profit[0].Amount }}</span>
        </div>
      </div>
      <div class="progress-line">
        <div class="filled" :style="{background: `#${person.Profit[0].Color}`, width: `${person.Profit[0].Amount/1000*100}%`}"></div>
      </div>
    </div>

    <div class="person-card__attention px-2 mb-2">
      <div class="row justify-content-between">
        <div class="col">
          <span>Attention</span>
        </div>
        <div class="col text-right">
          <span>48h</span>
        </div>
      </div>
      <div class="progress-line">
        <div 
          v-for="att, i in person.Attention"
          :key="i+att.Color"
          class="filled" 
          :style="{background: `#${att.Color}`, flex: '1'}"
        ></div>
      </div>
    </div>

    <div class="person-card__bottom px-2">
      <div class="row align-items-center justify-content-center">
        <div class="col-6">
          <div class="percent-amount">35%</div>
          <div class="color-block" style="background: #00d0d4; width: 35%"></div>
        </div>
        <div class="col-6">
          <div class="percent-amount">95%</div>
          <div class="color-block" style="background: #ffa500; width: 95%"></div>
        </div>
        <div class="col-6">
          <div class="percent-amount">80%</div>
          <div class="color-block" style="background: #ff98ff; width: 80%"></div>
        </div>
        <div class="col-6">
          <div class="percent-amount">55%</div>
          <div class="color-block" style="background: #0000ff; width: 55%"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    person: {
      type: Object,
      required: true
    },
    isView: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped lang="scss">
@import '~assets/scss/colors.scss';

.person-card {
  height: 480px;
  &.is-view {
    transition: all .2s ease-in;
  }
  &.is-view:hover {
    transform: scale(1.04);
  }

  &__img {
    height: 35%;
    position: relative;
    overflow-x: hidden;
    img {
      width: 100%;
      height: 100%;
      border-radius: 0 0 10px 10px;
    }

    .tags {
      position: absolute;
      top: 10%;
      right: 0;
      .tag {
        position: relative;
        right: -50%;
        cursor: pointer;
        margin-bottom: 5px;
        padding: 4px;
        font-size: 12px;
        border-radius: 4px;
        transition: all .3s ease;
        &:hover {
          right: -10%;
        }
      }
    }
  }

  &__name {
    color: $dark-color;
    font-size: 20px;
    font-weight: bold;
    cursor: pointer;

    &-pos {
      color: $grey-color;
      font-size: 16px;
      font-weight: normal;
    }
  }

  &__profit {
    color: $grey-color;

    .progress-line {
      height: 20px;
      background: $light-color;
      border-radius: 4px;
      position: relative;
      &:before {
        content: "-";
        position: absolute;
        left: 2px;
        top: 2px;
        height: 16px;
        width: 16px;
        display: flex;
        line-height: 16px;
        color: #f7f7f7;
        font-size: 12px;
        border: 1px solid #f7f7f7;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
      }
      &:after {
        content: "+";
        position: absolute;
        right: 2px;
        top: 2px;
        height: 16px;
        width: 16px;
        display: flex;
        line-height: 16px;
        color: #f7f7f7;
        font-size: 12px;
        border: 1px solid #f7f7f7;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
      }

      .filled {
        border-radius: 3px;
        height: 100%;
      }
    }
  }

  &__attention {
    color: $grey-color;
    .progress-line {
      display: flex;
      height: 20px;
      background: $light-color;
      border-radius: 4px;
      position: relative;

      .filled {
        margin-left: -2%;
        border-radius: 4px;
        height: 100%;
        &:first-child {
          margin-left: 0;
        }
        &:last-child {
          flex: 1;
        }
      }
    }
  }

  &__bottom {
    width: 150px;
    margin: 0 auto;
    .row {
      .col-6 {
        position: relative;
        display: flex;
        justify-content: flex-end;
        padding: 2px;
        height: 50px;
        .percent-amount {
          position: absolute;
          right: 5px;
          top: 5px;
        }
        .color-block {
          width: 100%;
          height: 100%;
          border-radius: 4px;
        }
      }
    }
  }

  .line {
    height: 2px;
    background: $dark-color;
  }
}
</style>
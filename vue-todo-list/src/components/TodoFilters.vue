<template>
  <div>
    <button @click="$emit('filter', 'ALL')">전체보기</button>
    <button @click="$emit('filter', 'ACTIVE')">해야할 일 보기</button>
    <button @click="$emit('filter', 'COMPLETED')">완료한 일 보기</button>
  </div>
</template>

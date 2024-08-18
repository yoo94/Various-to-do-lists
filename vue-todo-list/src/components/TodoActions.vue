<template>
  <div>
    <button @click="$emit('toggle-all')">전체완료토글</button>
    <button @click="$emit('delete-completed')">완료된 할일 삭제</button>
  </div>
</template>

<template>
    <label :for="id"
        :class="{'opacity-50 pointer-events-none':disabled}"
        class="cursor-pointer h-[200px] px-10 border border-dashed border-gray-300 hover:border-gray-500 hover:bg-gray-100 rounded flex justify-center items-center"
        @dragover.prevent="onDragOver"
        @dragleave="onDragLeave"
        @drop.prevent="onDrop">
        <input :id="id"
            hidden 
            multiple 
            type="file" 
            @change="onFilesChange"
            accept="image/jpg,image/jpeg,image/png,image/bmp;capture=camera" />
        <h1 class="text-gray-600 text-center text-sm md:text-base">
            Перетащите, чтобы загрузить <br>
            ... или нажмите, чтобы найти на компьютере <br>
            чтобы вставить из буфера
        </h1>
    </label>
</template>

<script setup lang="ts">
import { ALERT_MESSAGES } from '@/constants'

const id = useId()
const { pushAlert } = useAlert()
const emits = defineEmits(['files-changed'])
const { limit = 5, disabled = false } = defineProps<{ limit?: number, disabled?: boolean }>()
const isDragging = ref(false)

const onFilesChange = (e: any) => {
    if(disabled) return
    handleFiles(e.target.files)
}

const onDragOver = () => {
    if(disabled) return
    isDragging.value = true
}

const onDragLeave = () => {
    if(disabled) return
    isDragging.value = false
}

const onDrop = (e: DragEvent) => {
    if(disabled) return

    isDragging.value = false
    const files = e.dataTransfer?.files
    if (files) {
        handleFiles(files)
    }
}

const handleFiles = (fileList: FileList | null) => {
    if(disabled) return

    if (!fileList) return

    const files: File[] = []
    const len = fileList.length > limit ? limit : fileList.length

    if (fileList.length > limit) {
        pushAlert(ALERT_MESSAGES.NOT_MORE_5_FILES, 'WARNING')
    }

    for (let i = 0; i < len; i++) {
        files.push(fileList[i])
    }

    emits('files-changed', files)
}
</script>
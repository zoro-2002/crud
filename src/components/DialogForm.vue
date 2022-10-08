<template>
    <v-dialog v-model="showDialogForm" max-width="600" persistent>
        <v-card max-width="600">
            <form @submit.prevent>
                <v-text-field width="50vw" outlined placeholder="name" label="name" v-model="formData.name">
                </v-text-field>
                <v-text-field width="50vw" outlined placeholder="projectId" label="projectId"
                    v-model="formData.projectId">
                </v-text-field>
                <v-text-field width="50vw" outlined placeholder="_id" label="_id" v-model="formData._id">
                </v-text-field>
                <v-text-field width="50vw" outlined placeholder="roomType" label="roomType" v-model="formData.roomType">
                </v-text-field>
                <v-textarea outlined name="input-7-4" label="Description" v-model="formData.description">
                </v-textarea>
                <div class="droparea" @dragover.prevent @drop.stop.prevent>
                    <div class="droparea-filled" v-if="existingFile || inputFile">
                        <div class="file-wrapper">
                            <v-btn class="close-btn" tile elevation="2" x-small @click="removeImage()">
                                <v-icon>mdi-close</v-icon>
                            </v-btn>
                            <img ref="fileInput" class="img" :src="existingFile ? existingFile : inputFile" />
                        </div>
                    </div>
                    <div class="droparea-empty" v-else>
                        <label for="fileInput" class="label">
                            Click here to select and preview the file</label>
                        <input ref="fileInput" type="file" @input="pickImagefile($event)" id="fileInput" />
                    </div>
                </div>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn plain color="#BF2600" @click="closeDialogForm()">cancel</v-btn>
                    <v-btn plain color="#00875A">submit</v-btn>
                </v-card-actions>
            </form>
        </v-card>
    </v-dialog>
</template>

<script>

import { mapGetters, mapMutations } from 'vuex';

export default {
    props: {
        roomStyle: {
            type: Object,
            required: false,
        }
    },
    data() {
        return {
            formData: {},
            inputFile: null,
            existingFile: null,
        }
    },
    computed: {
        ...mapGetters(["showDialogForm"]),
    },
    watch: {
        showDialogForm(newValue) {
            if (newValue == true) {
                this.setInitialFormData();
            }
            if (newValue == false) {
                this.resetFormData();
            }
        }
    },
    methods: {
        ...mapMutations(["closeDialogForm"]),
        setInitialFormData() {
            this.formData = this.roomStyle
            this.existingFile = this.roomStyle.thumbnail;
        },
        pickImagefile(e) {
            let inputedImage = e.target.files[0]
            if (inputedImage) {
                this.inputFile = URL.createObjectURL(inputedImage)
            }
        },
        resetFormData() {
            this.formData = {}
        },
        removeImage() {
            if (this.inputFile) {
                this.inputFile = ""
            } else if (this.existingFile) {
                this.existingFile = ""
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.v-card {
    padding: 5%;
}

.droparea {
    display: block;
    height: 50vh;
    width: 100%;

    &-empty {
        height: 100%;
        width: 100%;
        background-color: $light-three;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1.2rem;
        padding: 5%;
        text-align: center;
        color: $light-one;
        font-weight: 500;
        border-radius: 0.5rem;
        position: relative;
    }

    &-filled {
        display: flex;
        justify-content: center;
        height: 90%;
    }
}

.img {
    object-fit: contain;
    height: 100%;
    max-width: 100%;
}

.label {
    display: flex;
    height: 100%;
    width: 100%;
    justify-content: center;
    align-items: center;
    position: absolute;
}

input[type="file"] {
    height: 100%;
    width: 100%;
    opacity: 0;
    position: absolute;
}

.file-wrapper {
    position: relative;
}

.v-btn.close-btn {
    position: absolute;
    top: 0;
    right: 0;
}

.v-icon {
    font-size: 1rem;
}
</style>
    
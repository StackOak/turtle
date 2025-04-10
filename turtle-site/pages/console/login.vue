<script setup lang="ts">
import type {FormError, FormSubmitEvent} from '@nuxt/ui'
import {Https} from "~/composables/https";
import {API} from "~/constants/api";

const toast = useToast()
const state = reactive({
  username: 'admin',
  password: '123456'
})

const validate = (state: any): FormError[] => {
  const errors = []
  if (!state.username) errors.push({name: 'username', message: 'Required'})
  if (!state.password) errors.push({name: 'password', message: 'Required'})
  return errors
}



async function onSubmit(event: FormSubmitEvent<typeof state>) {
  Https.action(API.USER.account_login, {
    body: state,
  }).then((res: any) => {
    useCookie('Authorization').value = res.data.tokenValue
    toast.add({title: '登陆成功', color: 'success'})
    useRouter().push('/console')
  });
}
</script>

<template>
  <UForm :validate="validate" :state="state" class=" flex justify-center items-center flex-col" @submit="onSubmit">
    <UFormField label="username" name="username">
      <UInput v-model="state.username"/>
    </UFormField>

    <UFormField label="Password" name="password">
      <UInput v-model="state.password" type="password"/>
    </UFormField>

    <UButton type="submit">
      Submit
    </UButton>
  </UForm>
</template>


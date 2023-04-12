<template>
    <div class="container col-md-10 col-xxl-10 py-4 px-4 border-top">
        <div class="row">
            <div class="col-lg-5">
                <div class="header">
                    <h6>
                        Change Password
                    </h6>
                </div>
                <div class="py-3 align-items-start">
                    <Form>
                        <div class="row">
                            <div class="col-sm-6 col-6">
                                <label for="" class="mb-2">Password</label>
                                <InputField type="password" Name="password" class="w-100"/>
                            </div>
                            <div class="col-sm-6 col-6">
                                <label for="" class="mb-2">New Password</label>
                                <InputField type="password" Name="newPassword" class="w-100" />
                            </div>
                        </div>
                        <div class="d-flex justify-content-end">
                            <button class="btn btn-sm btn-primary w-25">Save</button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import InputField from '@/components/InputField.vue';
import {Form} from 'vee-validate';
export default {
    components: {
        InputField, Form,
    },
}
</script>
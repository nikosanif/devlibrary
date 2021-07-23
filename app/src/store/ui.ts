/**
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";

@Module({
  name: "ui",
  stateFactory: true,
  namespaced: true
})
export default class UIModule extends VuexModule {
  public loading = false;

  @Action({ rawError: true })
  async waitFor(promise: Promise<unknown>) {
    this.context.commit("beginLoading");
    try {
      await promise;
    } finally {
      this.context.commit("endLoading");
    }
  }

  @Mutation
  beginLoading() {
    this.loading = true;
  }

  @Mutation
  endLoading() {
    this.loading = false;
  }
}

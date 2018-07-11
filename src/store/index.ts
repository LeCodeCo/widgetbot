import { Computed, Dictionary, Module } from '@cerebral/fluent'
import Router from '@cerebral/router'
import StorageModule from '@cerebral/storage'
import { translations } from 'locales'

import * as computed from './computed'
import * as signals from './sequences'
import { State } from './types'

const state: State = {
  screen: null,
  loading: true,
  server: null,
  subscriptions: Dictionary({}),
  visible: {
    channels: window.innerWidth > 520
  },
  modal: {
    open: false,
    type: null,
    data: null
  },

  emojis: Dictionary({}),
  url: null,

  channels: Dictionary({}),
  categories: Computed(computed.categories),

  activeChannel: null,
  channel: Computed(computed.activeChannel),

  members: Dictionary({}),

  user: {
    avatar: null,
    id: null,
    name: null,
    token: null,
    type: null
  },

  translation: translations.en
}

export const router = Router({
  routes: [
    {
      path: '/channels/:server/:channel/',
      signal: 'fetchChannel'
    },
    {
      path: '/channels/:server/',
      signal: 'fetchServer'
    },
    {
      path: '/*',
      signal: 'routeHome'
    }
  ]
})

export const storage = StorageModule({
  target: localStorage,
  json: true,
  sync: {
    token: 'user.token'
  },
  prefix: 'embed'
})

export const module = Module({
  state,
  signals,
  modules: { router, storage }
})

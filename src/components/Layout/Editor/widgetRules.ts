import { CreateWidget } from '@/data/EmbedsData'

const ytWidgetRule = /\[YOUTUBE@VID\]\((\S+)\)/
const duneWidgetRule = /\[DUNE@EMBED\]\((\S+)\)/

const ytWidget = CreateWidget(ytWidgetRule, 'https://www.youtube.com/embed/$1')

const duneWidget = CreateWidget(duneWidgetRule, 'https://dune.com/embeds/$1')

export const widgetRules = [ytWidget, duneWidget]

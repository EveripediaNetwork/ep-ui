import { HTMLConvertorMap, ToMdConvertorMap } from '@toast-ui/editor'
import { PluginCommandMap } from '@toast-ui/editor/dist/toastui-editor-viewer'
import {
  NodeViewPropMap,
  PluginProp,
  PluginToolbarItem,
} from '@toast-ui/editor/types/plugin'

interface PluginInfo {
  toHTMLRenderers?: HTMLConvertorMap
  toMarkdownRenderers?: ToMdConvertorMap
  markdownPlugins?: PluginProp[]
  wysiwygPlugins?: PluginProp[]
  wysiwygNodeViews?: NodeViewPropMap
  markdownCommands?: PluginCommandMap
  wysiwygCommands?: PluginCommandMap
  toolbarItems?: PluginToolbarItem[]
}

export default function redo(): PluginInfo {
  return {
    toolbarItems: [
      {
        groupIndex: 0,
        itemIndex: 1,
        item: {
          name: 'Redo',
          tooltip: 'Redo',
          className: 'toastui-editor-custom-toolbar-icon redo__toolbarBtn',
          command: 'redo',
        },
      },
    ],
  }
}

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

export default function undo(): PluginInfo {
  return {
    toolbarItems: [
      {
        groupIndex: 0,
        itemIndex: 0,
        item: {
          name: 'Undo',
          tooltip: 'Undo',
          command: 'undo',
          className: 'toastui-editor-custom-toolbar-icon undo__toolbarBtn',
        },
      },
    ],
  }
}

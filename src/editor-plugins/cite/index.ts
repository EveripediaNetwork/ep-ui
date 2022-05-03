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

export default function cite(): PluginInfo {
  return {
    toolbarItems: [
      {
        groupIndex: 1,
        itemIndex: 3,
        item: {
          name: 'cite',
          tooltip: 'Cite',
          className: 'toastui-editor-cite-button cite__popupBtn',
          //   popup: {
          //     body: container,
          //     style: { width: '300px' },
          //   },
        },
      },
    ],
    markdownCommands: {
      cite: () => {
        // TODO: figure out a markdown syntax for this
        return true
      },
    },
    wysiwygCommands: {
      cite: () => {
        // TODO: implement this
        return true
      },
    },
  }
}

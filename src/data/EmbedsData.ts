export const embeds = [
  {
    name: 'Dune',
    desc: 'Embeds widgets from dune.com',
    regex: /https:\/\/dune.com\/embeds\/\d+\/\d+\/(\w+|-)+/,
    type: 'DUNE',
  },
]

export const CreateWidget = (rule: RegExp, template: string) => {
  return {
    rule,
    toDOM(text: string) {
      const matched = text.match(rule)
      if (!matched) return null

      const container = document.createElement('div')
      container.classList.add('embed-widget-iframe')

      const iframe = document.createElement('iframe')
      iframe.src = template.replace('$1', matched[1])
      iframe.onload = () => {
        container.classList.add('embed-widget-iframe__loaded')
      }

      container.appendChild(iframe)

      return container
    },
  }
}

const ytWidgetRule = /\[YOUTUBE@VID\]\((\S+)\)/
const duneWidgetRule = /\[DUNE@EMBED\]\((\S+)\)/

const ytWidget = {
  rule: ytWidgetRule,
  toDOM(text: string) {
    const rule = ytWidgetRule
    const matched = text.match(rule)
    if (!matched) return null

    const ytIframeContainer = document.createElement('div')
    ytIframeContainer.classList.add('embed-widget-iframe')

    const ytIframe = document.createElement('iframe')
    ytIframe.onload = () => {
      ytIframeContainer.classList.add('embed-widget-iframe__loaded')
    }
    ytIframe.src = `https://www.youtube.com/embed/${matched[1]}`

    ytIframeContainer.appendChild(ytIframe)

    return ytIframeContainer
  },
}

const duneWidget = {
  rule: duneWidgetRule,
  toDOM(text: string) {
    const rule = duneWidgetRule
    const matched = text.match(rule)
    if (!matched) return null

    const duneIframeContainer = document.createElement('div')
    duneIframeContainer.classList.add('embed-widget-iframe')

    const duneIframe = document.createElement('iframe')
    duneIframe.src = `https://dune.com/embeds/${matched[1]}`
    duneIframe.onload = () => {
      duneIframeContainer.classList.add('embed-widget-iframe__loaded')
    }

    duneIframeContainer.appendChild(duneIframe)

    return duneIframeContainer
  },
}

export const widgetRules = [ytWidget, duneWidget]

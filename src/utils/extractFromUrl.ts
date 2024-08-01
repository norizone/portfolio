/**
 * 文字列から正規表示で値抽出
 */
export const extractFromString = (text: string, regex: RegExp) => {
  if (!text) return ''
  const match = text.match(regex)
  if (match && match[1]) {
    return match[1]
  } else {
    return ''
  }
}

/**
 * 正規表示で値抽出Numberで返す
 */
export const extractNumberFromUrl = (text: string, regex: RegExp) => {
  const firstMatch = extractFromString(text, regex)
  if (!firstMatch) return 0
  return parseInt(firstMatch, 10)
}

/** width: */
export const widthRegex = /width:(\d+)/
/** height: */
export const heightRegex = /height:(\d+)/

import React from 'react'
import { Icon, IconProps } from '@chakra-ui/react'

const CoinGeckoIcon = (props: IconProps) => {
  return (
    <Icon width="5" height="5" viewBox="0 0 24 24" fill="none" {...props}>
      <g clip-path="url(#clip0_4840_35888)">
        <path
          d="M12 6.14306C12.5406 6.17558 14.4955 6.7087 15 7C14.5796 5.97478 13.1645 5.83832 12 6.14306Z"
          fill="#4A5568"
        />
        <path
          d="M12 9.5C12 9.79667 11.912 10.0867 11.7472 10.3334C11.5824 10.58 11.3481 10.7723 11.074 10.8858C10.7999 10.9993 10.4983 11.0291 10.2074 10.9712C9.91639 10.9133 9.64912 10.7704 9.43934 10.5607C9.22956 10.3509 9.0867 10.0836 9.02882 9.79263C8.97094 9.50166 9.00065 9.20006 9.11418 8.92597C9.22771 8.65189 9.41997 8.41762 9.66664 8.2528C9.91332 8.08797 10.2033 8 10.5 8C10.8978 8 11.2794 8.15804 11.5607 8.43934C11.842 8.72064 12 9.10218 12 9.5Z"
          fill="#4A5568"
        />
        <path
          d="M11.9468 0.000117761C9.5735 0.0106318 7.25658 0.724685 5.28905 2.05198C3.32153 3.37928 1.79177 5.2602 0.893238 7.4569C-0.00529779 9.65361 -0.23226 12.0674 0.241051 14.3931C0.714362 16.7188 1.86669 18.8519 3.55231 20.5227C5.23794 22.1935 7.38115 23.3269 9.71094 23.7797C12.0407 24.2324 14.4524 23.9841 16.6411 23.0662C18.8298 22.1482 20.6971 20.6019 22.007 18.6227C23.3168 16.6436 24.0104 14.3204 23.9999 11.9471V11.9471C23.9929 10.3712 23.6757 8.81214 23.0662 7.35889C22.4567 5.90564 21.5669 4.58668 20.4477 3.47729C19.3285 2.36791 18.0017 1.48985 16.5431 0.893233C15.0845 0.296618 13.5227 -0.00686342 11.9468 0.000117761V0.000117761ZM18.339 13.4514C19.0025 13.1775 19.659 12.8601 20.2242 12.4079L20.2477 12.4349C19.7077 12.9271 19.0651 13.2914 18.4112 13.6132C17.7492 13.9271 17.0592 14.1784 16.3503 14.3636C15.6408 14.5471 14.9008 14.6853 14.1512 14.6175C13.4016 14.5497 12.6355 14.2949 12.139 13.7332L12.1625 13.7062C12.7712 14.101 13.4738 14.2401 14.1729 14.2601C14.8816 14.2819 15.5904 14.2236 16.286 14.0862C16.9886 13.9389 17.6759 13.7264 18.339 13.4514V13.4514ZM17.6434 11.414C17.6429 11.322 17.6696 11.2319 17.7203 11.1551C17.771 11.0783 17.8433 11.0183 17.9281 10.9826C18.013 10.9469 18.1064 10.9372 18.1968 10.9547C18.2871 10.9721 18.3703 11.0159 18.4357 11.0806C18.5011 11.1453 18.5459 11.228 18.5643 11.3181C18.5828 11.4083 18.5741 11.5018 18.5394 11.587C18.5046 11.6722 18.4454 11.7452 18.3692 11.7968C18.293 11.8483 18.2032 11.8761 18.1112 11.8766C17.9885 11.8762 17.8709 11.8274 17.784 11.7407C17.697 11.6541 17.6478 11.5367 17.6468 11.414H17.6434ZM10.426 11.414C10.0015 11.4144 9.58649 11.2888 9.23338 11.0533C8.88027 10.8178 8.60493 10.4828 8.44218 10.0908C8.27943 9.69881 8.23658 9.26734 8.31905 8.85097C8.40152 8.4346 8.6056 8.05204 8.9055 7.75166C9.20539 7.45128 9.58762 7.24658 10.0039 7.16343C10.4201 7.08029 10.8516 7.12244 11.2439 7.28455C11.6362 7.44667 11.9716 7.72147 12.2077 8.0742C12.4438 8.42693 12.57 8.84175 12.5703 9.26621C12.571 9.83508 12.3458 10.381 11.9442 10.7839C11.5426 11.1868 10.9975 11.4137 10.4286 11.4149L10.426 11.414ZM13.9668 22.9288V22.9227C13.5051 19.6758 16.3477 16.4949 17.9425 14.8697C18.3016 14.5053 18.8521 14.0053 19.3677 13.474C21.4616 11.5253 21.8895 9.1949 17.6286 8.03403C16.8234 7.80099 15.9886 7.47055 15.1434 7.13664C15.0947 6.92447 14.9068 6.66012 14.5268 6.33751C13.9747 5.85838 12.9373 5.87055 12.0408 6.08273C11.0512 5.84968 10.0738 5.76707 9.13554 5.99577C5.05641 7.11925 4.37467 9.1036 4.20858 11.494C3.98858 14.1271 3.86598 16.0792 2.86858 18.314C1.72088 16.6521 1.04841 14.7085 0.923632 12.6926C0.798858 10.6768 1.22651 8.66506 2.16051 6.87427C3.0945 5.08348 4.49944 3.58149 6.22395 2.53013C7.94845 1.47877 9.92715 0.917901 11.9468 0.907944H11.9512C14.7276 0.896139 17.4076 1.92534 19.4625 3.7925C21.5174 5.65965 22.7978 8.22914 23.0512 10.994C23.3046 13.7589 22.5125 16.5183 20.8313 18.7279C19.1501 20.9374 16.7018 22.4366 13.9695 22.9297L13.9668 22.9288Z"
          fill="#4A5568"
        />
      </g>
      <defs>
        <clipPath id="clip0_4840_35888">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </Icon>
  )
}

export default CoinGeckoIcon

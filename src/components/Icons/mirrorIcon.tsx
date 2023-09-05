import { Flex } from '@chakra-ui/react'
import React from 'react'

const MirrorIcon = () => {
  return (
    <Flex
      justify={'center'}
      align={'center'}
      w={4}
      h={4}
      rounded={'full'}
      bgColor={'white'}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="8"
        height="11"
        viewBox="0 0 8 11"
        fill="none"
      >
        <g clipPath="url(#clip0_26852_28745)">
          <path
            d="M0 4.645C0 2.44774 1.78123 0.666504 3.97849 0.666504C6.17578 0.666504 7.957 2.44774 7.957 4.645V10.3397C7.957 10.6736 7.68633 10.9443 7.35239 10.9443H0.604578C0.270679 10.9443 0 10.6736 0 10.3397V4.645Z"
            fill="url(#paint0_linear_26852_28745)"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M7.48428 10.4504V4.65659C7.48428 2.71475 5.91472 1.14057 3.97849 1.14057C2.04229 1.14057 0.472692 2.71475 0.472692 4.65659V10.4504C0.472692 10.4614 0.481511 10.4702 0.492388 10.4702H7.46461C7.4755 10.4702 7.48428 10.4614 7.48428 10.4504ZM3.97849 0.666504C1.78123 0.666504 0 2.45293 0 4.65659V10.4504C0 10.7232 0.220449 10.9443 0.492388 10.9443H7.46461C7.73656 10.9443 7.957 10.7232 7.957 10.4504V4.65659C7.957 2.45293 6.17578 0.666504 3.97849 0.666504Z"
            fill="black"
          />
        </g>
        <defs>
          <linearGradient
            id="paint0_linear_26852_28745"
            x1="1.02417"
            y1="1.25909"
            x2="7.98594"
            y2="12.3024"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0.0292475" stopColor="white" />
            <stop offset="0.410553" />
          </linearGradient>
          <clipPath id="clip0_26852_28745">
            <rect
              width="8"
              height="10.2778"
              fill="white"
              transform="translate(0 0.666504)"
            />
          </clipPath>
        </defs>
      </svg>
    </Flex>
  )
}

export default MirrorIcon

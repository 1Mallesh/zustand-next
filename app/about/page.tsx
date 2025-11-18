import Banner from '@/components/common/Banner/Banner'
import React from 'react'
import { about } from '../data/portfolioData';

export default function About() {
  const { banner } = about;
  return (
    <div>
        <Banner
              title={banner.title}
              subtitle={banner.subtitle}
              description={banner.description}
              show={banner.show}
                align="left"
            />
    </div>
  )
}

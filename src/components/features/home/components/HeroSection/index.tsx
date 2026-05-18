import React from 'react';
import NewHeroSection from './HeroSection';
import { HeroSectionProps } from './HeroSection.types';

const HeroSection: React.FC<HeroSectionProps> = (props) => {
    return <NewHeroSection {...props} />;
};

export default HeroSection;

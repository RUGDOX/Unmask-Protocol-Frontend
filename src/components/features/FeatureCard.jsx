
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';

const FeatureCard = ({ icon, title, description, content, buttonText, linkTo, buttonColor }) => {
  return (
    <Card className="bg-gray-900 border-gray-700">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-xl">
          {icon}
          <span className="text-white">{title}</span>
        </CardTitle>
        <CardDescription className="text-gray-300">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-gray-200">{content}</p>
      </CardContent>
      <CardFooter>
        <Link to={linkTo} className="w-full">
          <Button className={`w-full ${buttonColor} text-white font-medium`}>
            <span>{buttonText}</span>
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default FeatureCard;

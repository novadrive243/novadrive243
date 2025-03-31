
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AdminAIAssistant } from '@/components/admin/AdminAIAssistant';

interface AIAssistantTabProps {
  language: string;
}

export const AIAssistantTab = ({
  language
}: AIAssistantTabProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Assistant</CardTitle>
        <CardDescription>Get help with administrative tasks</CardDescription>
      </CardHeader>
      <CardContent>
        <AdminAIAssistant
          language={language}
        />
      </CardContent>
    </Card>
  );
};

import React from 'react';
import { StringIdentity, StringResolver } from '@digital-net/core';
import { Box, Button, Text, Table } from '@digital-net/react-digital-ui';
import { useCreate, useGet, useSchema } from '@digital-net/react-digital-client';
import type { ViewModel } from '@/models';

export default function ViewsPage() {
    const { schema, isLoading: isSchemaLoading } = useSchema('/view');
    const { entities, isQuerying, invalidateQuery } = useGet<ViewModel>('/view');
    const { create } = useCreate<ViewModel>('/view', {
        onSuccess: async () => await invalidateQuery(),
    });

    const isLoading = React.useMemo(() => isSchemaLoading || isQuerying, [isSchemaLoading, isQuerying]);

    const handleCreate = React.useCallback(() => {
        const payload = {};
        for (const s of schema) {
            const resolvedName = StringResolver.toCamelCase(s.name);
            if (s.isForeignKey || s.isIdentity || s.isReadOnly || !s.isRequired) {
                continue;
            }
            if (s.type === 'String') {
                payload[resolvedName] = StringIdentity.generate();
            }
            if (s.type === 'Boolean') {
                payload[resolvedName] = false;
            }
            if (s.type === 'DateTime') {
                payload[resolvedName] = new Date().toISOString();
            }
        }
        create(payload);
    }, [create, schema]);

    return (
        <Box gap={1} p={2}>
            <Box direction="row" align="center" gap={2}>
                <Text>Views Page</Text>
                <Button onClick={handleCreate}>Create</Button>
            </Box>
            {isLoading
                ? <Text>Loading...</Text>
                : (
                        <Table
                            schema={schema}
                            entities={entities} 
                            onDelete={() => console.log('delete')}
                            onEdit={() => console.log('edit')}
                        />
                    )}
        </Box>
    );
}

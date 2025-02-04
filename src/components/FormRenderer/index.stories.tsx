/** *******************************************************************************************************************
  Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
  
  Licensed under the Apache License, Version 2.0 (the "License").
  You may not use this file except in compliance with the License.
  You may obtain a copy of the License at
  
      http://www.apache.org/licenses/LICENSE-2.0
  
  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.                                                                              *
 ******************************************************************************************************************** */
import React, { useCallback } from 'react';
import { action } from '@storybook/addon-actions';
import FormRenderer, { componentTypes, validatorTypes } from '.';
import { awsServices } from '../Autosuggest/data/data';
import Box from '../../layouts/Box';
import Text from '../Text';
import Input from '../Input';
import FileUpload from '../FileUpload';
import Container from '../../layouts/Container';
import { ValidatorMapper } from '@data-driven-forms/react-form-renderer/validator-mapper';
import FormRendererMarkdownEditor from '../FormRendererMarkdownEditor';
import FormRendererTable from '../FormRendererTable';

export default {
    component: FormRenderer,
    title: 'FormRenderer',
};

const treeItems = {
    id: '1',
    label: 'Tree Root',
    children: [
        {
            id: '2',
            label: 'Node 1.0',
            children: [
                { id: '3', label: 'Node 1.1' },
                { id: '4', label: 'Node 1.3' },
            ],
        },
        {
            id: '5',
            label: 'Node 2.0',
            children: [
                {
                    id: '6',
                    label: 'Node 2.1.0',
                    children: [{ id: '7', label: 'Node 2.1.2' }],
                },
                { id: '8', label: 'Node 2.2' },
            ],
        },
    ],
};

const baseSchema = {
    fields: [
        {
            component: componentTypes.TEXT_FIELD,
            name: 'email',
            label: 'Email',
            isRequired: true,
            validate: [
                {
                    type: validatorTypes.REQUIRED,
                },
                {
                    type: validatorTypes.PATTERN,
                    message: 'Invalid email address',
                    // eslint-disable-next-line
                    pattern: /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/i,
                },
            ],
        },
        {
            component: componentTypes.TEXT_FIELD,
            name: 'password',
            label: 'Password',
            type: 'password',
            isRequired: true,
            validate: [
                {
                    type: validatorTypes.REQUIRED,
                },
                {
                    type: validatorTypes.MIN_LENGTH,
                    threshold: 6,
                },
                {
                    type: validatorTypes.MAX_LENGTH,
                    threshold: 10,
                },
            ],
        },
        {
            component: componentTypes.TEXT_FIELD,
            name: 'number',
            label: 'Number',
            type: 'number',
            validate: [
                {
                    type: validatorTypes.MIN_NUMBER_VALUE,
                    includeThreshold: true,
                    value: 4,
                },
                {
                    type: validatorTypes.MAX_NUMBER_VALUE,
                    includeThreshold: false,
                    value: 20,
                },
            ],
        },
        {
            component: componentTypes.CHECKBOX,
            name: 'checkbox',
            label: 'Checkbox',
            options: [
                {
                    label: 'Option 1',
                    value: '1',
                },
                {
                    label: 'Option 2',
                    value: '2',
                },
                {
                    label: 'Option 3',
                    value: '3',
                },
            ],
            isRequired: true,
            validate: [
                {
                    type: validatorTypes.REQUIRED,
                },
            ],
        },
        {
            component: componentTypes.RADIO,
            name: 'radio',
            label: 'Radio',
            options: [
                {
                    label: 'Option 1',
                    description: 'Description 1',
                    value: '1',
                },
                {
                    label: 'Option 2',
                    value: '2',
                },
                {
                    label: 'Option 3',
                    value: '3',
                },
            ],
            isRequired: true,
            validate: [
                {
                    type: validatorTypes.REQUIRED,
                },
            ],
        },
        {
            component: componentTypes.SELECT,
            name: 'select',
            label: 'Select',
            placeholder: 'Choose an option',
            options: [
                {
                    label: 'Option 1',
                    value: '1',
                },
                {
                    label: 'Option 2',
                    value: '2',
                },
                {
                    label: 'Option 3',
                    value: '3',
                },
            ],
            isRequired: true,
            validate: [
                {
                    type: validatorTypes.REQUIRED,
                },
            ],
            renderReload: true,
            onReloadClick: () => {},
            createNewLink: 'Create new option',
            createNewLinkHref: '/options/create',
        },
        {
            component: componentTypes.SELECT,
            name: 'autosugguest',
            label: 'Autosuggest',
            placeholder: 'Choose an AWS service',
            isSearchable: true,
            options: awsServices,
            isRequired: true,
            validate: [
                {
                    type: validatorTypes.REQUIRED,
                },
            ],
        },
        {
            component: componentTypes.SELECT,
            name: 'multiselect',
            label: 'Multiselect',
            placeholder: 'Choose an AWS service',
            multiSelect: true,
            options: awsServices,
            isRequired: true,
            checkboxes: true,
            validate: [
                {
                    type: validatorTypes.REQUIRED,
                },
            ],
        },
        {
            component: componentTypes.TEXTAREA,
            name: 'textarea',
            label: 'Textarea',
            helperText: 'This is a help text',
            isRequired: true,
            validate: [
                {
                    type: validatorTypes.REQUIRED,
                },
            ],
        },
        {
            component: componentTypes.SWITCH,
            name: 'switch',
            label: 'Switch',
        },
        {
            component: componentTypes.SWITCH,
            name: 'switch1',
            label: 'Switch 1',
        },
        {
            component: componentTypes.SWITCH,
            name: 'switch2',
            label: 'Switch 2',
        },
        {
            component: componentTypes.DATE_PICKER,
            name: 'datePicker',
            label: 'Date picker',
            isRequired: true,
            validate: [
                {
                    type: validatorTypes.REQUIRED,
                },
            ],
        },
        {
            component: componentTypes.TIME_PICKER,
            name: 'timePicker',
            label: 'Time picker',
            isRequired: true,
            validate: [
                {
                    type: validatorTypes.REQUIRED,
                },
            ],
        },
        {
            component: componentTypes.TREE_VIEW,
            label: 'this is a tree',
            helperText: 'this is a hint',
            description: 'this is a description',
            name: 'tree',
            treeItems: treeItems,
            multiSelect: true,
            defaultExpanded: ['1', '2'],
            validate: [
                {
                    type: validatorTypes.REQUIRED,
                },
            ],
        },
        {
            component: componentTypes.CHECKBOX,
            name: 'confirm',
            label: 'I understand the terms and condition',
            description: 'Term 1.0.0',
            validate: [
                {
                    type: validatorTypes.REQUIRED,
                    message: 'please accept the terms and condition',
                },
            ],
        },
    ],
    header: 'Data driven form',
    description: 'Define your form in json format',
};

export const Default = () => {
    return <FormRenderer schema={baseSchema} onSubmit={action('Submit')} onCancel={action('Cancel')} />;
};

export const WithInitialValues = () => {
    const initialValues = {
        email: 'test@test.com',
        password: 'password',
        number: 10,
        textarea: 'textarea',
        checkbox: ['1', '2'],
        switch: true,
        radio: '3',
        select: '2',
        autosugguest: {
            value: 'Lambda',
            label: 'Lambda - Amazon Lambda',
        },
        multiselect: [
            {
                value: 'Lambda',
                label: 'Lambda - Amazon Lambda',
            },
            {
                value: 'EC2',
                label: 'EC2 - Amazon Elastic Compute Cloud',
            },
        ],
        confirm: true,
        datePicker: new Date(2020, 1, 1),
        timePicker: '2020-01-01T00:00:00Z',
        tree: ['3', '5'],
    };

    return (
        <FormRenderer
            schema={baseSchema}
            onSubmit={action('Submit')}
            onCancel={action('Cancel')}
            initialValues={initialValues}
        />
    );
};

export const ResetButton = () => {
    const initialValues = {
        email: 'test@test.com',
        password: 'password',
        number: 10,
        textarea: 'textarea',
        checkbox: ['1', '2'],
        switch: true,
        radio: '3',
        select: '2',
        autosugguest: {
            value: 'Lambda',
            label: 'Lambda - Amazon Lambda',
        },
        multiselect: [
            {
                value: 'Lambda',
                label: 'Lambda - Amazon Lambda',
            },
            {
                value: 'EC2',
                label: 'EC2 - Amazon Elastic Compute Cloud',
            },
        ],
        confirm: true,
        datePicker: new Date(2020, 1, 1),
        timePicker: '2020-01-01T00:00:00Z',
        tree: ['3', '5'],
    };

    const resetableSchema = {
        ...baseSchema,
        canReset: true,
    };

    return (
        <FormRenderer
            schema={resetableSchema}
            onSubmit={action('Submit')}
            onCancel={action('Cancel')}
            initialValues={initialValues}
        />
    );
};

export const SubForms = () => {
    const schema = {
        fields: [
            {
                component: componentTypes.SUB_FORM,
                title: 'Subform 1',
                description: 'This is a subform',
                name: 'subform1',
                fields: [
                    {
                        component: componentTypes.TEXT_FIELD,
                        name: 'name1',
                        label: 'Name',
                        validate: [
                            {
                                type: validatorTypes.REQUIRED,
                            },
                        ],
                    },
                    {
                        component: componentTypes.EXPANDABLE_SECTION,
                        title: 'Additional information',
                        description: 'This is for additional information',
                        name: 'additionalInfo',
                        fields: [
                            {
                                component: componentTypes.TEXT_FIELD,
                                name: 'username',
                                label: 'Username',
                                validate: [
                                    {
                                        type: validatorTypes.REQUIRED,
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
            {
                component: componentTypes.EXPANDABLE_SECTION,
                title: 'Subform 2',
                description: 'This is a expandable subform',
                name: 'subform2',
                variant: 'container',
                fields: [
                    {
                        component: componentTypes.TEXT_FIELD,
                        name: 'name2',
                        label: 'First name',
                        validate: [
                            {
                                type: validatorTypes.REQUIRED,
                            },
                        ],
                    },
                    {
                        component: componentTypes.TEXT_FIELD,
                        name: 'name3',
                        label: 'Last name',
                        validate: [
                            {
                                type: validatorTypes.REQUIRED,
                            },
                        ],
                    },
                ],
            },
            {
                component: componentTypes.EXPANDABLE_SECTION,
                title: 'Subform 3',
                description: 'This is a expanded expandable subform',
                name: 'subform3',
                expandable: true,
                expanded: true,
                variant: 'container',
                fields: [
                    {
                        component: componentTypes.SELECT,
                        name: 'select',
                        label: 'Select',
                        placeholder: 'Choose an option',
                        options: [
                            {
                                label: 'Option 1',
                                value: '1',
                            },
                            {
                                label: 'Option 2',
                                value: '2',
                            },
                            {
                                label: 'Option 3',
                                value: '3',
                            },
                        ],
                        isRequired: true,
                        validate: [
                            {
                                type: validatorTypes.REQUIRED,
                            },
                        ],
                    },
                ],
            },
        ],
        header: 'Data driven form with subforms',
        description: 'Define your form in json format',
    };

    return <FormRenderer schema={schema} onSubmit={action('Submit')} onCancel={action('Cancel')} />;
};

export const FieldArray = () => {
    const schema = {
        fields: [
            {
                component: componentTypes.FIELD_ARRAY,
                label: 'Attribute Editor - layout=default',
                description: 'This is a form array',
                name: 'fieldArray1',
                helperText: 'You can add up to 6 more items.',
                minItems: 4,
                maxItems: 6,
                noItemsMessage: 'Please add new item',
                defaultItem: {
                    key: 'key',
                    value: 'value',
                    type: 'type1',
                },
                validate: [
                    {
                        type: validatorTypes.MIN_ITEMS,
                        threshold: 4,
                    },
                    {
                        type: validatorTypes.REQUIRED,
                    },
                ],
                fields: [
                    {
                        component: componentTypes.TEXT_FIELD,
                        name: 'key',
                        label: 'Key',
                        validate: [
                            {
                                type: validatorTypes.REQUIRED,
                            },
                        ],
                    },
                    {
                        component: componentTypes.TEXT_FIELD,
                        name: 'value',
                        label: 'Value',
                        validate: [
                            {
                                type: validatorTypes.REQUIRED,
                            },
                        ],
                    },
                    {
                        component: componentTypes.SELECT,
                        name: 'type',
                        label: 'Type',
                        placeholder: 'Choose the type',
                        options: [
                            { label: 'Type 1', value: 'type1' },
                            { label: 'Type 2', value: 'type2' },
                            { label: 'Type 3', value: 'type3' },
                        ],
                        validate: [
                            {
                                type: validatorTypes.REQUIRED,
                            },
                        ],
                    },
                ],
            },
            {
                component: componentTypes.FIELD_ARRAY,
                label: 'Attribute Editor',
                description: 'This is a form array - layout=stack',
                name: 'fieldArray2',
                helperText: 'You can add up to 6 more items.',
                minItems: 3,
                maxItems: 6,
                layout: 'stack',
                noItemsMessage: 'Please add new item',
                defaultItem: {
                    key: 'key',
                    value: 'value',
                    type: {
                        label: 'Type 1',
                        value: 'type1',
                    },
                },
                validate: [
                    {
                        type: validatorTypes.MIN_ITEMS,
                        threshold: 3,
                    },
                    {
                        type: validatorTypes.REQUIRED,
                    },
                ],
                fields: [
                    {
                        component: componentTypes.TEXT_FIELD,
                        name: 'key',
                        label: 'Key',
                        validate: [
                            {
                                type: validatorTypes.REQUIRED,
                            },
                        ],
                    },
                    {
                        component: componentTypes.TEXT_FIELD,
                        name: 'value',
                        label: 'Value',
                        validate: [
                            {
                                type: validatorTypes.REQUIRED,
                            },
                        ],
                    },
                    {
                        component: componentTypes.SELECT,
                        name: 'type',
                        label: 'Type',
                        placeholder: 'Choose the type',
                        isSearchable: true,
                        options: [
                            { label: 'Type 1', value: 'type1' },
                            { label: 'Type 2', value: 'type2' },
                            { label: 'Type 3', value: 'type3' },
                        ],
                        validate: [
                            {
                                type: validatorTypes.REQUIRED,
                            },
                        ],
                    },
                ],
            },
            {
                component: componentTypes.FIELD_ARRAY,
                label: 'Attribute Editor - readonly - layout=grid',
                description: 'This is a readonly form array',
                name: 'readonlyFieldArray',
                layout: 'grid',
                isReadOnly: true,
                fields: [
                    {
                        component: componentTypes.TEXT_FIELD,
                        name: 'key',
                        label: 'Key',
                        isReadOnly: true,
                        column: 3,
                        validate: [
                            {
                                type: validatorTypes.REQUIRED,
                            },
                        ],
                    },
                    {
                        component: componentTypes.TEXT_FIELD,
                        name: 'value',
                        label: 'Value',
                        isReadOnly: true,
                        column: 4,
                        validate: [
                            {
                                type: validatorTypes.REQUIRED,
                            },
                        ],
                    },
                    {
                        component: componentTypes.SELECT,
                        name: 'type',
                        label: 'Type',
                        placeholder: 'Choose the type',
                        isReadOnly: true,
                        column: 5,
                        options: [
                            { label: 'Type 1', value: 'type1' },
                            { label: 'Type 2', value: 'type2' },
                            { label: 'Type 3', value: 'type3' },
                        ],
                        validate: [
                            {
                                type: validatorTypes.REQUIRED,
                            },
                        ],
                    },
                ],
            },
        ],
        header: 'Data driven form with field arrays',
        description: 'Define your form in json format',
    };

    const initialValues = {
        fieldArray1: [
            { key: 'key1', value: 'value1', type: 'type1' },
            { key: 'key2', value: 'value2', type: 'type2' },
            { key: 'key3', value: 'value3', type: 'type3' },
        ],
        readonlyFieldArray: [
            { key: 'key1', value: 'value1', type: 'type1' },
            { key: 'key2', value: 'value2', type: 'type2' },
            { key: 'key3', value: 'value3', type: 'type3' },
            { key: 'key4', value: 'value4', type: 'type1' },
        ],
    };

    return (
        <FormRenderer
            schema={schema}
            onSubmit={action('Submit')}
            onCancel={action('Cancel')}
            initialValues={initialValues}
        />
    );
};

export const ComplexFieldArray = () => {
    const schema = {
        fields: [
            {
                component: componentTypes.FIELD_ARRAY,
                label: 'Sales Order',
                description: 'Enter sales order detail',
                name: 'salesOrder',
                displayLablePerItem: true,
                renderContainer: true,
                layout: 'grid',
                noItemsMessage: 'Please add new sales order',
                buttonLabels: {
                    add: 'Add a new sales order',
                },
                fields: [
                    {
                        component: componentTypes.TEXT_FIELD,
                        name: 'id',
                        label: 'Id',
                        column: 5,
                        validate: [
                            {
                                type: validatorTypes.REQUIRED,
                            },
                        ],
                    },
                    {
                        component: componentTypes.TEXT_FIELD,
                        name: 'description',
                        label: 'Description',
                        column: 5,
                        validate: [
                            {
                                type: validatorTypes.REQUIRED,
                            },
                        ],
                    },
                    {
                        component: componentTypes.FIELD_ARRAY,
                        label: 'Sales Order Items',
                        description: 'Enter sales order items',
                        name: 'items',
                        helperText: 'You can add up to 6 more items.',
                        column: 10,
                        minItems: 1,
                        maxItems: 6,
                        buttonLabels: {
                            add: 'Add a new sales order item',
                        },
                        noItemsMessage: 'Please add new sales order item',
                        defaultItem: {
                            id: 'item1',
                            count: '1',
                            status: 'Ready',
                        },
                        validate: [
                            {
                                type: validatorTypes.MIN_ITEMS,
                                threshold: 1,
                            },
                            {
                                type: validatorTypes.REQUIRED,
                            },
                        ],
                        fields: [
                            {
                                component: componentTypes.TEXT_FIELD,
                                name: 'id',
                                label: 'Id',
                                validate: [
                                    {
                                        type: validatorTypes.REQUIRED,
                                    },
                                ],
                            },
                            {
                                component: componentTypes.TEXT_FIELD,
                                name: 'count',
                                label: 'Count',

                                validate: [
                                    {
                                        type: validatorTypes.REQUIRED,
                                    },
                                ],
                            },
                            {
                                component: componentTypes.SELECT,
                                name: 'status',
                                label: 'Status',
                                placeholder: 'Choose the type',
                                options: [
                                    { label: 'Picking', value: 'Picking' },
                                    { label: 'Packing', value: 'Packing' },
                                    { label: 'Ready', value: 'Ready' },
                                ],
                                validate: [
                                    {
                                        type: validatorTypes.REQUIRED,
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
        ],
        header: 'Sales Order Form',
        description: 'Enter sales orders',
    };

    const initialValues = {
        salesOrder: [
            {
                id: 'orderId',
                description: 'value1',
                items: [
                    { id: 'item1', count: '1', status: 'Picking' },
                    { id: 'item2', count: '2', status: 'Packing' },
                ],
            },
        ],
    };

    return (
        <FormRenderer
            schema={schema}
            onSubmit={action('Submit')}
            onCancel={action('Cancel')}
            initialValues={initialValues}
        />
    );
};

const ReviewTemplate = (data: any) => {
    return <Box>{JSON.stringify(data)}</Box>;
};

const wizardSchema = {
    fields: [
        {
            component: componentTypes.WIZARD,
            name: 'wizzard',
            submitButtonText: 'Custom Submit Label',
            fields: [
                {
                    name: 'step-1',
                    title: 'Step 1',
                    description: 'Descrirption for Step 1',
                    fields: [
                        {
                            component: componentTypes.TEXTAREA,
                            name: 'textarea',
                            label: 'Textarea',
                            validate: [
                                {
                                    type: validatorTypes.REQUIRED,
                                },
                            ],
                        },
                        {
                            component: componentTypes.SELECT,
                            name: 'type',
                            label: 'Type',
                            placeholder: 'Choose the type',
                            options: [
                                { label: 'Type 1', value: 'type1' },
                                { label: 'Type 2', value: 'type2' },
                                { label: 'Type 3', value: 'type3' },
                            ],
                            validate: [
                                {
                                    type: validatorTypes.REQUIRED,
                                },
                            ],
                        },
                        {
                            component: componentTypes.EXPANDABLE_SECTION,
                            title: 'Additional information',
                            description: 'This is for additional information',
                            name: 'additionalInfo',
                            variant: 'default',
                            fields: [
                                {
                                    component: componentTypes.TEXT_FIELD,
                                    name: 'username',
                                    label: 'Username',
                                    expandable: true,
                                    validate: [
                                        {
                                            type: validatorTypes.REQUIRED,
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
                {
                    name: 'step-2',
                    title: 'Step 2',
                    fields: [
                        {
                            component: componentTypes.CHECKBOX,
                            name: 'checkbox',
                            label: 'Checkbox',
                            options: [
                                {
                                    label: 'Option 1',
                                    value: '1',
                                },
                                {
                                    label: 'Option 2',
                                    value: '2',
                                },
                                {
                                    label: 'Option 3',
                                    value: '3',
                                },
                            ],
                            isRequired: true,
                            validate: [
                                {
                                    type: validatorTypes.REQUIRED,
                                },
                            ],
                        },
                        {
                            component: componentTypes.RADIO,
                            name: 'radio',
                            label: 'Radio',
                            options: [
                                {
                                    label: 'Option 1',
                                    value: '1',
                                },
                                {
                                    label: 'Option 2',
                                    value: '2',
                                },
                                {
                                    label: 'Option 3',
                                    value: '3',
                                },
                            ],
                            isRequired: true,
                            validate: [
                                {
                                    type: validatorTypes.REQUIRED,
                                },
                            ],
                        },
                        {
                            component: componentTypes.FIELD_ARRAY,
                            label: 'Attribute Editor',
                            description: 'This is a form array',
                            name: 'fieldArray',
                            helperText: 'You can add up to 6 more items.',
                            minItems: 4,
                            maxItems: 6,
                            noItemsMessage: 'Please add new item',
                            defaultItem: {
                                key: 'key',
                                value: 'value',
                                type: 'type1',
                            },
                            validate: [
                                {
                                    type: validatorTypes.MIN_ITEMS,
                                    threshold: 4,
                                },
                                {
                                    type: validatorTypes.REQUIRED,
                                },
                            ],
                            fields: [
                                {
                                    component: componentTypes.TEXT_FIELD,
                                    name: 'key',
                                    label: 'Key',
                                    validate: [
                                        {
                                            type: validatorTypes.REQUIRED,
                                        },
                                    ],
                                },
                                {
                                    component: componentTypes.TEXT_FIELD,
                                    name: 'value',
                                    label: 'Value',
                                    validate: [
                                        {
                                            type: validatorTypes.REQUIRED,
                                        },
                                    ],
                                },
                                {
                                    component: componentTypes.SELECT,
                                    name: 'type',
                                    label: 'Type',
                                    placeholder: 'Choose the type',
                                    options: [
                                        { label: 'Type 1', value: 'type1' },
                                        { label: 'Type 2', value: 'type2' },
                                        { label: 'Type 3', value: 'type3' },
                                    ],
                                    validate: [
                                        {
                                            type: validatorTypes.REQUIRED,
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
                {
                    name: 'step-3',
                    title: 'Step 3',
                    fields: [
                        {
                            component: componentTypes.TEXT_FIELD,
                            name: 'name1',
                            label: 'Name',
                            validate: [
                                {
                                    type: validatorTypes.REQUIRED,
                                },
                            ],
                        },
                        {
                            component: componentTypes.SWITCH,
                            name: 'switch',
                            label: 'Switch',
                        },
                        {
                            component: componentTypes.DATE_PICKER,
                            name: 'datePicker',
                            label: 'Date picker',
                            isRequired: true,
                            validate: [
                                {
                                    type: validatorTypes.REQUIRED,
                                },
                            ],
                        },
                        {
                            component: componentTypes.TIME_PICKER,
                            name: 'timePicker',
                            label: 'Time picker',
                            isRequired: true,
                            validate: [
                                {
                                    type: validatorTypes.REQUIRED,
                                },
                            ],
                        },
                        {
                            component: componentTypes.TREE_VIEW,
                            label: 'this is a tree',
                            helperText: 'this is a hint',
                            description: 'this is a description',
                            name: 'tree',
                            treeItems: treeItems,
                            multiSelect: true,
                            defaultExpanded: ['1', '2'],
                            validate: [
                                {
                                    type: validatorTypes.REQUIRED,
                                },
                            ],
                        },
                        {
                            component: componentTypes.CHECKBOX,
                            name: 'confirm',
                            label: 'I understand the terms and condition',
                            description: 'Term 1.0.0',
                            validate: [
                                {
                                    type: validatorTypes.REQUIRED,
                                    message: 'please accept the terms and condition',
                                },
                            ],
                        },
                    ],
                },
                {
                    name: 'step-4',
                    title: 'Step 4',
                    fields: [
                        {
                            component: 'TABLE',
                            name: 'table',
                            label: 'Table',
                            description: 'This is a table',
                            getRowId: (data: any) => data.id,
                            items: [
                                {
                                    id: 'id0000011',
                                    name: 'Engagement 11',
                                    createdDate: '2019-10-12',
                                },
                                {
                                    id: 'id0000012',
                                    name: 'Engagement 12',
                                    createdDate: '2019-11-12',
                                },
                                {
                                    id: 'id0000013',
                                    name: 'Engagement 13',
                                    createdDate: '2020-01-01',
                                },
                            ],
                            columnDefinitions: [
                                {
                                    id: 'id',
                                    width: 200,
                                    Header: 'Id',
                                    accessor: 'id',
                                },
                                {
                                    id: 'name',
                                    width: 200,
                                    Header: 'Name',
                                    accessor: 'name',
                                },
                                {
                                    id: 'createdDate',
                                    width: 200,
                                    Header: 'Created date',
                                    accessor: 'createdDate',
                                },
                            ],
                            validate: [
                                {
                                    type: validatorTypes.REQUIRED,
                                },
                            ],
                        },
                    ],
                },
                {
                    name: 'step-5',
                    title: 'Review',
                    fields: [
                        {
                            component: componentTypes.REVIEW,
                            name: 'review',
                            Template: ReviewTemplate,
                        },
                    ],
                },
            ],
        },
    ],
    header: 'Data driven form with wizard',
    description: 'Define your form in json format',
};

export const Wizard = () => {
    const customComponentMapping = {
        TABLE: FormRendererTable,
    };
    return (
        <FormRenderer
            schema={wizardSchema}
            customComponentWrapper={customComponentMapping}
            onSubmit={action('Submit')}
            onCancel={action('Cancel')}
        />
    );
};

export const WizardWithInitialValues = () => {
    const customComponentMapping = {
        TABLE: FormRendererTable,
    };

    const initialValues = {
        textarea: 'textarea',
        type: 'type1',
        additionalInfo: { username: 'username' },
        checkbox: ['1'],
        radio: '1',
        fieldArray: [
            { key: 'key1', value: 'value1', type: 'type1' },
            { key: 'key2', value: 'value2', type: 'type2' },
            { key: 'key3', value: 'value3', type: 'type3' },
            { key: 'key4', value: 'value4', type: 'type1' },
        ],
        name1: 'name',
        switch: true,
        datePicker: '2020-06-11T14:00:00.000Z',
        timePicker: '2020-06-11T14:00:00.000Z',
        tree: ['3'],
        confirm: true,
        table: [
            { id: 'id0000012', name: 'Engagement 12', createdDate: '2019-11-12' },
            { id: 'id0000013', name: 'Engagement 13', createdDate: '2020-01-01' },
        ],
    };
    return (
        <FormRenderer
            schema={wizardSchema}
            customComponentWrapper={customComponentMapping}
            initialValues={initialValues}
            onSubmit={action('Submit')}
            onCancel={action('Cancel')}
        />
    );
};

const CustomComponentSimple = ({ label }) => <Text>{label}</Text>;

const CustomComponentComplex = ({ input }) => <Input onChange={input.onChange} value={input.value} />;

export const Custom = () => {
    const schema = {
        fields: [
            {
                component: componentTypes.CUSTOM,
                name: 'text',
                label: 'This is the content of custom component',
                CustomComponent: CustomComponentSimple,
            },
            {
                component: componentTypes.CUSTOM,
                name: 'input',
                CustomComponent: CustomComponentComplex,
            },
        ],
        header: 'Data driven form with Custom Component',
        description:
            'Custom Component is an extension of Review Component which allows users to include custom business logic',
    };

    return (
        <FormRenderer
            schema={schema}
            initialValues={{
                input: 'initial input',
            }}
            onSubmit={action('Submit')}
            onCancel={action('Cancel')}
        />
    );
};

const FileUploadComponent = ({ name, input, onChange }) => {
    const handleOnChange = useCallback(
        (files) => {
            if (files && files.length > 0) {
                if (onChange) {
                    onChange(files);
                }

                input.onChange(files.map((f) => f.name));
            }
        },
        [input, onChange]
    );
    return <FileUpload controlId={name} onChange={handleOnChange} />;
};

export const FileUploader = () => {
    const schema = {
        fields: [
            {
                component: componentTypes.CUSTOM,
                name: 'file',
                CustomComponent: FileUploadComponent,
                onChange: action('File selection change'),
            },
        ],
        header: 'Data driven form using FileUpload',
        description: 'File upload logic can be implemented outside FormRenderer',
    };

    return <FormRenderer schema={schema} onSubmit={action('Submit')} onCancel={action('Cancel')} />;
};

export const Submitting = () => {
    const schema = {
        fields: [
            {
                component: componentTypes.TEXT_FIELD,
                name: 'input',
                isDisabled: true,
            },
        ],
        header: 'Spinner while submitting',
    };

    return <FormRenderer schema={schema} onSubmit={action('Submit')} onCancel={action('Cancel')} isSubmitting={true} />;
};

export const SimpleMarkdownEditor = () => {
    const customComponentMapping = {
        MARKDOWN_EDITOR: FormRendererMarkdownEditor,
    };

    const schema = {
        submitLabel: 'Save',
        cancelLabel: 'Back',
        fields: [
            {
                component: 'MARKDOWN_EDITOR',
                name: 'markdownOne',
                label: 'This is a markdown editor',
                helperText: 'Helper text provides users some guidance.',
                initialValue: '# I am a Markdown editor.\n\rHave a play.',
                onChange: action('Markdown content change'),
                validate: [
                    {
                        type: validatorTypes.REQUIRED,
                    },
                ],
            },
            {
                component: 'MARKDOWN_EDITOR',
                name: 'markdownTwo',
                label: 'This is a read only markdown editor',
                isReadOnly: true,
                initialValue: '# I should be read only\n\rAnd you should not be able to edit me',
            },
        ],
        header: 'Markdown Editor',
        description: 'This component allows a user to enter markdown and renders it in real-time.',
    };

    return (
        <Container>
            <FormRenderer
                customComponentWrapper={customComponentMapping}
                schema={schema}
                onSubmit={action('Submit')}
                onCancel={action('Cancel')}
            />
        </Container>
    );
};

const controlInteractionSchema = {
    fields: [
        {
            component: componentTypes.SELECT,
            name: 'select1',
            label: 'Select 1',
            placeholder: 'Choose an option',
            options: [
                {
                    label: 'Option 1',
                    value: '1',
                },
                {
                    label: 'Option 2',
                    value: '2',
                },
                {
                    label: 'Option 3',
                    value: '3',
                },
            ],
            isRequired: true,
            validate: [
                {
                    type: validatorTypes.REQUIRED,
                },
            ],
        },
        {
            component: componentTypes.SELECT,
            name: 'select2',
            label: 'Select 2',
            helperText: 'Enabled only when the value of Select 1 is 2',
            placeholder: 'Choose an option',
            options: [
                {
                    label: 'Option 21',
                    value: '21',
                },
                {
                    label: 'Option 22',
                    value: '22',
                },
                {
                    label: 'Option 23',
                    value: '23',
                },
            ],
            isRequired: true,
            validate: [
                {
                    type: validatorTypes.REQUIRED,
                },
            ],
            resolveProps: (_props, _field, formOptions) => {
                const values = formOptions.getState().values;
                return values.select1 === '2'
                    ? {
                          isDisabled: false,
                      }
                    : {
                          isDisabled: true,
                      };
            },
            condition: {
                when: 'select1',
                is: '2',
                then: { visible: true, set: { select2: '22' } },
                else: { visible: true, set: { select2: '21' } },
            },
        },
        {
            component: componentTypes.SELECT,
            name: 'select3',
            label: 'Select 3',
            helperText: 'Options changes with the value of Select 1 and only visible when Select 1 is set',
            placeholder: 'Choose an option',
            isRequired: true,
            validate: [
                {
                    type: validatorTypes.REQUIRED,
                },
            ],
            resolveProps: (_props, _field, formOptions) => {
                const values = formOptions.getState().values;
                return {
                    options: [
                        {
                            label: `Option 3${values.select1}1`,
                            value: `3${values.select1}1`,
                        },
                        {
                            label: `Option 3${values.select1}2`,
                            value: `3${values.select1}2`,
                        },
                        {
                            label: `Option 3${values.select1}3`,
                            value: `3${values.select1}3`,
                        },
                    ],
                };
            },
            condition: {
                when: 'select1',
                isNotEmpty: true,
            },
        },
    ],
    header: 'Data driven form',
    description: 'Define your form in json format',
};

export const ControlInteraction = () => {
    return (
        <FormRenderer
            schema={controlInteractionSchema}
            onSubmit={action('Submit')}
            onCancel={action('Cancel')}
            subscription={{ values: true }}
        />
    );
};

export const CustomValidator = () => {
    const validatorMapping: ValidatorMapper = {
        custom:
            ({ threshold }: any) =>
            (value: number) =>
                !value
                    ? 'this is a required field'
                    : value > threshold
                    ? `${value} must be <= ${threshold}`
                    : undefined,
    };
    const schema = {
        submitLabel: 'Save',
        cancelLabel: 'Back',
        fields: [
            {
                component: componentTypes.TEXT_FIELD,
                name: 'number',
                label: 'Number',
                type: 'number',
                validate: [
                    {
                        type: 'custom',
                        threshold: 6,
                    },
                ],
            },
        ],
        header: 'Custom Validator',
        description: 'This component allows a user to provide a custom validator.',
    };

    return (
        <Container>
            <FormRenderer
                schema={schema}
                validatorMapper={validatorMapping}
                onSubmit={action('Submit')}
                onCancel={action('Cancel')}
            />
        </Container>
    );
};

import isMobile from 'is-mobile';
import React, { Component, Fragment } from 'react'
import { message, DatePicker,TimePicker,Divider, Form, Select, InputNumber, Switch, Radio, Slider, Button, Upload, Rate, Checkbox, Row, Col, Input } from 'antd';
import './TestCase.css'
import { useEffect,useState } from 'react';
import TextArea from 'antd/lib/input/TextArea';
import { UploadOutlined, InboxOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { NoFormStatus } from 'antd/lib/form/context';
import { Typography } from 'antd';
import { USE_JSON_SERVER,REMOTE_SERVER } from '../../../functions/functions';
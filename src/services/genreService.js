import http from './httpService';
import {apiUrl} from '../config.json';
import axios from 'axios';

export function getGenres() {
    return http.get(apiUrl+"/genres");
}
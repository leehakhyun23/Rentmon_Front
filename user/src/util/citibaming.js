import { useState } from "react";

/* global naver */
export const getCoordinates = (address) => {
    return new Promise((resolve, reject) => {
        naver.maps.Service.geocode({
            query: address
        }, function(status, response) {
            if (status === naver.maps.Service.Status.ERROR) {
                console.error('주소이상!');
                // reject();
                return;
            }

            if (response.v2.meta.totalCount === 0) {
                console.error('주소이상');
                // reject();
                return;
            }

            const result = response.v2.addresses[0];
            const coordinates = {
                latitude: result.y,
                longitude: result.x
            };

            resolve(coordinates);
        });
    });
};
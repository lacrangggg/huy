"use strict";

const listEvent = [
    {
        imdbID: 0,
        Poster: './resource/10/bdg/BDG-1.jpg',
        Title: 'Bach Dang Giang',
        Summary: 'Kỉ niệm đầu tiên cùng các bạn và cô',
        Class: 10,
        ListInnerPoster: ["./resource/10/bdg/BDG-1.jpg", "./resource/10/bdg/BDG-2.jpg", "./resource/10/bdg/BDG-3.jpg"]
    },
    {
        imdbID: 1,
        Poster: './resource/10/bdg/BDG-2.jpg',
        Title: 'Truc Tuan',
        Summary: 'Diễn kịch quá đỉnh ',
        Class: 10,
        ListInnerVideo: ["./resource/10/tt/TT-1.mp4"]
    },
    {
        imdbID: 2,
        Poster: './resource/10/20-10/20-10-1.jpg',
        Title: '20-10',
        Summary: 'Một hành động rất ga lăng đến từ phía các bạn nam',
        Class: 10,
        ListInnerPoster: ["./resource/10/20-10/20-10-1.jpg", "./resource/10/20-10/20-10-2.jpg"]
    },
    {
        imdbID: 3,
        Poster: './resource/11/20-10/20-10-1.jpg',
        Title: '20-10',
        Summary: 'Những quý ông và bầu show NVAH',
        Class: 11,
        ListInnerPoster: ["./resource/11/20-10/20-10-1.jpg", "./resource/11/20-10/20-10-2.jpg", "./resource/11/20-10/20-10-3.jpg"],
        ListInnerVideo: ["./resource/11/20-10/20-10-vid-1.mp4"]
    },
    {
        imdbID: 4,
        Poster: './resource/11/20-11/20-11-1.PNG',
        Title: '20-11',
        Summary: 'Teamwork quá đẳng cấp',
        Class: 11,
        ListInnerPoster: ["./resource/11/20-11/20-11-1.PNG", "./resource/11/20-11/20-11-2.jpg", "./resource/11/20-11/20-11-3.jpg", "./resource/11/20-11/20-11-4.JPG"]
    },
    {
        imdbID: 5,
        Poster: './resource/12/20-11/20-11-1.jpg',
        Title: '20-11',
        Summary: 'Cô Hà quá xinh!!!!!!!!!!!!',
        Class: 12,
        ListInnerPoster: ["./resource/12/20-11/20-11-1.jpg"]
    },
    {
        imdbID: 6,
        Poster: './resource/12/th/th-4.JPG',
        Title: 'Di Choi',
        Summary: 'Kỉ niệm tại FLC Thanh Hóa cùng với ca sĩ phòng trà',
        Class: 12,
        ListInnerPoster: ["./resource/12/th/th-4.JPG","./resource/12/th/th-1.JPG","./resource/12/th/th-2.JPG","./resource/12/th/th-3.JPG"]
    }
];


function getEvents() {
    return new Promise((resolve, reject) => {

        // start global loading...
        startLoading();

        setTimeout(() => {
            try {
                resolve({ events: listEvent, totalResults: listEvent.length });
            } catch (err) {
                reject(err);
            } finally { // stop global loading 
                stopLoading();
            }
        }, 1000);
    });
}

function getSingleEvent(id) {
    return new Promise((resolve, reject) => {

        // start global loading...
        startLoading();

        try {
            console.log(id)
            const idNumber = Number(id);
            const event = listEvent.find(event => {
                return event.imdbID === idNumber;
            });
            if (event) {
                resolve(event);
            } else {
                reject('Event not exist!');
            }
        } catch (err) {
            reject(err);
        } finally { // stop global loading 
            stopLoading();
        }
    });
}

function startLoading() {
    document.body.classList.add("loading")
}

function stopLoading() {
    document.body.classList.remove("loading")
}

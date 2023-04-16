import { type Outlet } from "@prisma/client";

export const outletSingle = (): Outlet => {
  return {
    id: "1",
    name: "Outlet 1",
    houseNumber: 1,
    city: "Antwerpen",
    zipCode: 2000,
    category: "cafe",
    street: "Street 1",
    location: {
      type: "MultiPoint",
      coordinates: [51.2194475, 4.4024643],
    },
    openingHours: [
      {
        id: "1",
        weekday: "monday",
        openAt: "10:00",
        closesAt: "00:00",
        closesAtNextDay: true,
      },
      {
        id: "1",
        weekday: "tuesday",
        openAt: "10:00",
        closesAt: "00:00",
        closesAtNextDay: true,
      },
      {
        id: "1",
        weekday: "wednesday",
        openAt: "10:00",
        closesAt: "00:00",
        closesAtNextDay: true,
      },
      {
        id: "1",
        weekday: "thursday",
        openAt: "10:00",
        closesAt: "00:00",
        closesAtNextDay: true,
      },
      {
        id: "1",
        weekday: "friday",
        openAt: "10:00",
        closesAt: "00:00",
        closesAtNextDay: true,
      },
      {
        id: "1",
        weekday: "saturday",
        openAt: "10:00",
        closesAt: "00:00",
        closesAtNextDay: true,
      },
      {
        id: "1",
        weekday: "sunday",
        openAt: "10:00",
        closesAt: "00:00",
        closesAtNextDay: true,
      },
    ],
    sunlightHours: [
      {
        id: "05c96e62-2ac9-4aba-b67f-c3e4da39c1d4",
        startDate: "01/01/2022",
        endDate: "07/01/2022",
        outletSunlightHours: [
          {
            id: "4c621d4e-83c2-480f-9e70-a8e05c984563",
            startTime: "7:00",
            endTime: "7:15",
            sunShine: 0,
          },
          {
            id: "be1a5df3-3812-40e8-a05d-0ad812a89a1e",
            startTime: "7:15",
            endTime: "7:30",
            sunShine: 0,
          },
          {
            id: "29f2e736-84a6-4bbb-9a59-766f0c192500",
            startTime: "7:30",
            endTime: "7:45",
            sunShine: 0,
          },
          {
            id: "2524e060-f668-4781-82b5-ab445c205738",
            startTime: "7:45",
            endTime: "8:00",
            sunShine: 0,
          },
          {
            id: "ba0129e4-9e5e-4147-aa10-4f07f177aaba",
            startTime: "8:00",
            endTime: "8:15",
            sunShine: 0,
          },
          {
            id: "92a25fbf-2934-4587-8e3b-2f6fc410aad6",
            startTime: "8:15",
            endTime: "8:30",
            sunShine: 0,
          },
          {
            id: "f25b568e-374e-4af6-b064-5bc862905d40",
            startTime: "8:30",
            endTime: "8:45",
            sunShine: 0,
          },
          {
            id: "217ab8ef-492c-4d9b-a391-17ebb894da31",
            startTime: "8:45",
            endTime: "9:00",
            sunShine: 0,
          },
          {
            id: "a4734d5a-d2e7-4d43-92b4-1c6939ce851b",
            startTime: "9:00",
            endTime: "9:15",
            sunShine: 0,
          },
          {
            id: "378640f5-0bde-4a37-b0bb-f34756ac5486",
            startTime: "9:15",
            endTime: "9:30",
            sunShine: 0,
          },
          {
            id: "8373603e-76d9-446d-a6b1-492018b6d0fa",
            startTime: "9:30",
            endTime: "9:45",
            sunShine: 0,
          },
          {
            id: "f5db10e2-a7b1-496a-8bdf-25c8a0b9d559",
            startTime: "9:45",
            endTime: "10:00",
            sunShine: 1,
          },
          {
            id: "e23340df-a194-41b2-95b5-06ce11e9d45a",
            startTime: "10:00",
            endTime: "10:15",
            sunShine: 1,
          },
          {
            id: "b8bbde07-ed55-4b8d-a90d-a2e3e473fccb",
            startTime: "10:15",
            endTime: "10:30",
            sunShine: 4,
          },
          {
            id: "0e9d7fc7-d002-4680-a024-30c25cf1a771",
            startTime: "10:30",
            endTime: "10:45",
            sunShine: 4,
          },
          {
            id: "23944445-96f9-46e9-a5ae-51dcaa2df0aa",
            startTime: "10:45",
            endTime: "11:00",
            sunShine: 4,
          },
          {
            id: "6e75ef94-7f8e-4bfe-9f1f-9fde6b1b1e2c",
            startTime: "11:00",
            endTime: "11:15",
            sunShine: 4,
          },
          {
            id: "d4a90c83-83d9-4a7e-96a1-35401123d480",
            startTime: "11:15",
            endTime: "11:30",
            sunShine: 4,
          },
          {
            id: "a6c79483-504b-4e3d-9b74-52bb2a5e7a33",
            startTime: "11:30",
            endTime: "11:45",
            sunShine: 4,
          },
          {
            id: "3d37e7e4-3c9b-4019-b4e9-b58803ab348c",
            startTime: "11:45",
            endTime: "12:00",
            sunShine: 4,
          },
          {
            id: "aa008748-06eb-4152-8c76-b4496ad7ecc2",
            startTime: "12:00",
            endTime: "12:15",
            sunShine: 4,
          },
          {
            id: "1ff15c04-2fa8-48ac-864c-e667f22052f1",
            startTime: "12:15",
            endTime: "12:30",
            sunShine: 4,
          },
          {
            id: "ff5585e9-746e-4d3a-b07d-55f46264d830",
            startTime: "12:30",
            endTime: "12:45",
            sunShine: 4,
          },
          {
            id: "83ccec53-4d90-4824-92ed-6cafdb980d2e",
            startTime: "12:45",
            endTime: "13:00",
            sunShine: 4,
          },
          {
            id: "9ecf796b-c299-4e00-8ef0-db7b0e88a63e",
            startTime: "13:00",
            endTime: "13:15",
            sunShine: 4,
          },
          {
            id: "ad6d8889-b314-465d-af8c-9bb050284e04",
            startTime: "13:15",
            endTime: "13:30",
            sunShine: 4,
          },
          {
            id: "05821ca9-7161-4e5a-969d-ebe36f354bcf",
            startTime: "13:30",
            endTime: "13:45",
            sunShine: 3,
          },
          {
            id: "6b98b521-c990-49a2-bc2e-1032cf50cee2",
            startTime: "13:45",
            endTime: "14:00",
            sunShine: 3,
          },
          {
            id: "43e4f90d-69f5-4b5d-af4a-f8d86139b556",
            startTime: "14:00",
            endTime: "14:15",
            sunShine: 3,
          },
          {
            id: "7626efb2-12e7-4d29-bb80-4f4622ed86bc",
            startTime: "14:15",
            endTime: "14:30",
            sunShine: 2,
          },
          {
            id: "10f86043-f838-42fc-9c0f-665cafc4e958",
            startTime: "14:30",
            endTime: "14:45",
            sunShine: 0,
          },
          {
            id: "57e737cc-c5c1-407b-b196-8a737a73ecb7",
            startTime: "14:45",
            endTime: "15:00",
            sunShine: 0,
          },
          {
            id: "babd12f4-93a8-4665-8d83-32997160aae7",
            startTime: "15:00",
            endTime: "15:15",
            sunShine: 0,
          },
          {
            id: "ad297faf-91d0-496c-be5a-1a20d3ad97ff",
            startTime: "15:15",
            endTime: "15:30",
            sunShine: 0,
          },
          {
            id: "9ac21088-6b9d-4d9f-92ba-c1149ea6dc7f",
            startTime: "15:30",
            endTime: "15:45",
            sunShine: 0,
          },
          {
            id: "cb669fc4-3950-4c33-93f7-a4bb32b0446b",
            startTime: "15:45",
            endTime: "16:00",
            sunShine: 0,
          },
          {
            id: "4d385b20-da71-48d6-8065-7187b336ea28",
            startTime: "16:00",
            endTime: "16:15",
            sunShine: 0,
          },
          {
            id: "c6ae731f-d63b-4cd6-bbc9-6439c3d0d1af",
            startTime: "16:15",
            endTime: "16:30",
            sunShine: 0,
          },
          {
            id: "629d0df0-6386-4029-9b57-be7fce26be36",
            startTime: "16:30",
            endTime: "16:45",
            sunShine: 0,
          },
          {
            id: "e54cfdf2-9098-4591-85c3-fce00438d47a",
            startTime: "16:45",
            endTime: "17:00",
            sunShine: 0,
          },
          {
            id: "c77881b2-f22a-44e3-8a4c-32c354d130c5",
            startTime: "17:00",
            endTime: "17:15",
            sunShine: 0,
          },
          {
            id: "1f823fe3-38c8-461f-b0ba-901a89a93f31",
            startTime: "17:15",
            endTime: "17:30",
            sunShine: 0,
          },
          {
            id: "bc84c0cb-7cf3-40ee-8118-551f919f0972",
            startTime: "17:30",
            endTime: "17:45",
            sunShine: 0,
          },
          {
            id: "fa220f22-096d-42e1-986b-b3650dcdeac9",
            startTime: "17:45",
            endTime: "18:00",
            sunShine: 0,
          },
          {
            id: "fd06d577-f786-49fd-baba-1c1cbcddb35e",
            startTime: "18:00",
            endTime: "18:15",
            sunShine: 0,
          },
          {
            id: "c23ecd44-789f-4a43-a43f-f0e87c638a2c",
            startTime: "18:15",
            endTime: "18:30",
            sunShine: 0,
          },
          {
            id: "64e7c2b6-5d5a-4a32-97c4-1afcdaf8a242",
            startTime: "18:30",
            endTime: "18:45",
            sunShine: 0,
          },
          {
            id: "5d850abb-7e5c-46ec-8c27-aa0ed3089640",
            startTime: "18:45",
            endTime: "19:00",
            sunShine: 0,
          },
          {
            id: "eeb930d6-3c05-4070-b2d7-28acb968460b",
            startTime: "19:00",
            endTime: "19:15",
            sunShine: 0,
          },
          {
            id: "c3db2a16-166a-4a60-bf36-2d4f77ef7cbe",
            startTime: "19:15",
            endTime: "19:30",
            sunShine: 0,
          },
          {
            id: "c8b27608-fced-45fe-bedc-93d24a0d1841",
            startTime: "19:30",
            endTime: "19:45",
            sunShine: 0,
          },
          {
            id: "4c038ce0-609a-4190-85d5-60a762b5bcbf",
            startTime: "19:45",
            endTime: "20:00",
            sunShine: 0,
          },
          {
            id: "1f421f9c-9c01-4d4d-b088-4f935dbf448a",
            startTime: "20:00",
            endTime: "20:15",
            sunShine: 0,
          },
          {
            id: "945d7b0d-09e9-4af9-9134-a13867a8e5a5",
            startTime: "20:15",
            endTime: "20:30",
            sunShine: 0,
          },
          {
            id: "148e9249-5e4b-4e2c-bd9b-4384caa5acf4",
            startTime: "20:30",
            endTime: "20:45",
            sunShine: 0,
          },
          {
            id: "5b49cd46-7a89-4602-96c5-d9942a5fae9f",
            startTime: "20:45",
            endTime: "21:00",
            sunShine: 0,
          },
          {
            id: "b2ff3d12-fca3-4ef8-83ba-2c500f7f2ab9",
            startTime: "21:00",
            endTime: "21:15",
            sunShine: 0,
          },
          {
            id: "6720c682-baf8-48ee-8378-e45699cc624e",
            startTime: "21:15",
            endTime: "21:30",
            sunShine: 0,
          },
          {
            id: "5defa0eb-ab45-4e58-b19d-72df83055655",
            startTime: "21:30",
            endTime: "21:45",
            sunShine: 0,
          },
          {
            id: "fde41576-f5e7-423d-83ad-18850ad98f56",
            startTime: "21:45",
            endTime: "22:00",
            sunShine: 0,
          },
          {
            id: "52c09365-be05-48c3-a286-a19f1ab779c1",
            startTime: "22:00",
            endTime: "22:15",
            sunShine: 0,
          },
        ],
      },
    ],
    createdAt: "2023-04-12 13:22:24",
    updatedAt: "2023-04-12 13:22:24",
  };
};

export const outletShortList = (): Outlet[] => {
  return [
    {
      id: "1",
      name: "Outlet 1",
      houseNumber: 1,
      city: "Antwerpen",
      zipCode: 2000,
      category: "cafe",
      street: "Street 1",
      location: {
        type: "MultiPoint",
        coordinates: [51.2194475, 4.4024643],
      },
      openingHours: [
        {
          id: "1",
          weekday: "monday",
          openAt: "10:00",
          closesAt: "00:00",
          closesAtNextDay: true,
        },
        {
          id: "1",
          weekday: "tuesday",
          openAt: "10:00",
          closesAt: "00:00",
          closesAtNextDay: true,
        },
        {
          id: "1",
          weekday: "wednesday",
          openAt: "10:00",
          closesAt: "00:00",
          closesAtNextDay: true,
        },
        {
          id: "1",
          weekday: "thursday",
          openAt: "10:00",
          closesAt: "00:00",
          closesAtNextDay: true,
        },
        {
          id: "1",
          weekday: "friday",
          openAt: "10:00",
          closesAt: "00:00",
          closesAtNextDay: true,
        },
        {
          id: "1",
          weekday: "saturday",
          openAt: "10:00",
          closesAt: "00:00",
          closesAtNextDay: true,
        },
        {
          id: "1",
          weekday: "sunday",
          openAt: "10:00",
          closesAt: "00:00",
          closesAtNextDay: true,
        },
      ],
      sunlightHours: [
        {
          id: "05c96e62-2ac9-4aba-b67f-c3e4da39c1d4",
          startDate: "01/01/2022",
          endDate: "07/01/2022",
          outletSunlightHours: [
            {
              id: "4c621d4e-83c2-480f-9e70-a8e05c984563",
              startTime: "7:00",
              endTime: "7:15",
              sunShine: 0,
            },
            {
              id: "be1a5df3-3812-40e8-a05d-0ad812a89a1e",
              startTime: "7:15",
              endTime: "7:30",
              sunShine: 0,
            },
            {
              id: "29f2e736-84a6-4bbb-9a59-766f0c192500",
              startTime: "7:30",
              endTime: "7:45",
              sunShine: 0,
            },
            {
              id: "2524e060-f668-4781-82b5-ab445c205738",
              startTime: "7:45",
              endTime: "8:00",
              sunShine: 0,
            },
            {
              id: "ba0129e4-9e5e-4147-aa10-4f07f177aaba",
              startTime: "8:00",
              endTime: "8:15",
              sunShine: 0,
            },
            {
              id: "92a25fbf-2934-4587-8e3b-2f6fc410aad6",
              startTime: "8:15",
              endTime: "8:30",
              sunShine: 0,
            },
            {
              id: "f25b568e-374e-4af6-b064-5bc862905d40",
              startTime: "8:30",
              endTime: "8:45",
              sunShine: 0,
            },
            {
              id: "217ab8ef-492c-4d9b-a391-17ebb894da31",
              startTime: "8:45",
              endTime: "9:00",
              sunShine: 0,
            },
            {
              id: "a4734d5a-d2e7-4d43-92b4-1c6939ce851b",
              startTime: "9:00",
              endTime: "9:15",
              sunShine: 0,
            },
            {
              id: "378640f5-0bde-4a37-b0bb-f34756ac5486",
              startTime: "9:15",
              endTime: "9:30",
              sunShine: 0,
            },
            {
              id: "8373603e-76d9-446d-a6b1-492018b6d0fa",
              startTime: "9:30",
              endTime: "9:45",
              sunShine: 0,
            },
            {
              id: "f5db10e2-a7b1-496a-8bdf-25c8a0b9d559",
              startTime: "9:45",
              endTime: "10:00",
              sunShine: 1,
            },
            {
              id: "e23340df-a194-41b2-95b5-06ce11e9d45a",
              startTime: "10:00",
              endTime: "10:15",
              sunShine: 1,
            },
            {
              id: "b8bbde07-ed55-4b8d-a90d-a2e3e473fccb",
              startTime: "10:15",
              endTime: "10:30",
              sunShine: 4,
            },
            {
              id: "0e9d7fc7-d002-4680-a024-30c25cf1a771",
              startTime: "10:30",
              endTime: "10:45",
              sunShine: 4,
            },
            {
              id: "23944445-96f9-46e9-a5ae-51dcaa2df0aa",
              startTime: "10:45",
              endTime: "11:00",
              sunShine: 4,
            },
            {
              id: "6e75ef94-7f8e-4bfe-9f1f-9fde6b1b1e2c",
              startTime: "11:00",
              endTime: "11:15",
              sunShine: 4,
            },
            {
              id: "d4a90c83-83d9-4a7e-96a1-35401123d480",
              startTime: "11:15",
              endTime: "11:30",
              sunShine: 4,
            },
            {
              id: "a6c79483-504b-4e3d-9b74-52bb2a5e7a33",
              startTime: "11:30",
              endTime: "11:45",
              sunShine: 4,
            },
            {
              id: "3d37e7e4-3c9b-4019-b4e9-b58803ab348c",
              startTime: "11:45",
              endTime: "12:00",
              sunShine: 4,
            },
            {
              id: "aa008748-06eb-4152-8c76-b4496ad7ecc2",
              startTime: "12:00",
              endTime: "12:15",
              sunShine: 4,
            },
            {
              id: "1ff15c04-2fa8-48ac-864c-e667f22052f1",
              startTime: "12:15",
              endTime: "12:30",
              sunShine: 4,
            },
            {
              id: "ff5585e9-746e-4d3a-b07d-55f46264d830",
              startTime: "12:30",
              endTime: "12:45",
              sunShine: 4,
            },
            {
              id: "83ccec53-4d90-4824-92ed-6cafdb980d2e",
              startTime: "12:45",
              endTime: "13:00",
              sunShine: 4,
            },
            {
              id: "9ecf796b-c299-4e00-8ef0-db7b0e88a63e",
              startTime: "13:00",
              endTime: "13:15",
              sunShine: 4,
            },
            {
              id: "ad6d8889-b314-465d-af8c-9bb050284e04",
              startTime: "13:15",
              endTime: "13:30",
              sunShine: 4,
            },
            {
              id: "05821ca9-7161-4e5a-969d-ebe36f354bcf",
              startTime: "13:30",
              endTime: "13:45",
              sunShine: 3,
            },
            {
              id: "6b98b521-c990-49a2-bc2e-1032cf50cee2",
              startTime: "13:45",
              endTime: "14:00",
              sunShine: 3,
            },
            {
              id: "43e4f90d-69f5-4b5d-af4a-f8d86139b556",
              startTime: "14:00",
              endTime: "14:15",
              sunShine: 3,
            },
            {
              id: "7626efb2-12e7-4d29-bb80-4f4622ed86bc",
              startTime: "14:15",
              endTime: "14:30",
              sunShine: 2,
            },
            {
              id: "10f86043-f838-42fc-9c0f-665cafc4e958",
              startTime: "14:30",
              endTime: "14:45",
              sunShine: 0,
            },
            {
              id: "57e737cc-c5c1-407b-b196-8a737a73ecb7",
              startTime: "14:45",
              endTime: "15:00",
              sunShine: 0,
            },
            {
              id: "babd12f4-93a8-4665-8d83-32997160aae7",
              startTime: "15:00",
              endTime: "15:15",
              sunShine: 0,
            },
            {
              id: "ad297faf-91d0-496c-be5a-1a20d3ad97ff",
              startTime: "15:15",
              endTime: "15:30",
              sunShine: 0,
            },
            {
              id: "9ac21088-6b9d-4d9f-92ba-c1149ea6dc7f",
              startTime: "15:30",
              endTime: "15:45",
              sunShine: 0,
            },
            {
              id: "cb669fc4-3950-4c33-93f7-a4bb32b0446b",
              startTime: "15:45",
              endTime: "16:00",
              sunShine: 0,
            },
            {
              id: "4d385b20-da71-48d6-8065-7187b336ea28",
              startTime: "16:00",
              endTime: "16:15",
              sunShine: 0,
            },
            {
              id: "c6ae731f-d63b-4cd6-bbc9-6439c3d0d1af",
              startTime: "16:15",
              endTime: "16:30",
              sunShine: 0,
            },
            {
              id: "629d0df0-6386-4029-9b57-be7fce26be36",
              startTime: "16:30",
              endTime: "16:45",
              sunShine: 0,
            },
            {
              id: "e54cfdf2-9098-4591-85c3-fce00438d47a",
              startTime: "16:45",
              endTime: "17:00",
              sunShine: 0,
            },
            {
              id: "c77881b2-f22a-44e3-8a4c-32c354d130c5",
              startTime: "17:00",
              endTime: "17:15",
              sunShine: 0,
            },
            {
              id: "1f823fe3-38c8-461f-b0ba-901a89a93f31",
              startTime: "17:15",
              endTime: "17:30",
              sunShine: 0,
            },
            {
              id: "bc84c0cb-7cf3-40ee-8118-551f919f0972",
              startTime: "17:30",
              endTime: "17:45",
              sunShine: 0,
            },
            {
              id: "fa220f22-096d-42e1-986b-b3650dcdeac9",
              startTime: "17:45",
              endTime: "18:00",
              sunShine: 0,
            },
            {
              id: "fd06d577-f786-49fd-baba-1c1cbcddb35e",
              startTime: "18:00",
              endTime: "18:15",
              sunShine: 0,
            },
            {
              id: "c23ecd44-789f-4a43-a43f-f0e87c638a2c",
              startTime: "18:15",
              endTime: "18:30",
              sunShine: 0,
            },
            {
              id: "64e7c2b6-5d5a-4a32-97c4-1afcdaf8a242",
              startTime: "18:30",
              endTime: "18:45",
              sunShine: 0,
            },
            {
              id: "5d850abb-7e5c-46ec-8c27-aa0ed3089640",
              startTime: "18:45",
              endTime: "19:00",
              sunShine: 0,
            },
            {
              id: "eeb930d6-3c05-4070-b2d7-28acb968460b",
              startTime: "19:00",
              endTime: "19:15",
              sunShine: 0,
            },
            {
              id: "c3db2a16-166a-4a60-bf36-2d4f77ef7cbe",
              startTime: "19:15",
              endTime: "19:30",
              sunShine: 0,
            },
            {
              id: "c8b27608-fced-45fe-bedc-93d24a0d1841",
              startTime: "19:30",
              endTime: "19:45",
              sunShine: 0,
            },
            {
              id: "4c038ce0-609a-4190-85d5-60a762b5bcbf",
              startTime: "19:45",
              endTime: "20:00",
              sunShine: 0,
            },
            {
              id: "1f421f9c-9c01-4d4d-b088-4f935dbf448a",
              startTime: "20:00",
              endTime: "20:15",
              sunShine: 0,
            },
            {
              id: "945d7b0d-09e9-4af9-9134-a13867a8e5a5",
              startTime: "20:15",
              endTime: "20:30",
              sunShine: 0,
            },
            {
              id: "148e9249-5e4b-4e2c-bd9b-4384caa5acf4",
              startTime: "20:30",
              endTime: "20:45",
              sunShine: 0,
            },
            {
              id: "5b49cd46-7a89-4602-96c5-d9942a5fae9f",
              startTime: "20:45",
              endTime: "21:00",
              sunShine: 0,
            },
            {
              id: "b2ff3d12-fca3-4ef8-83ba-2c500f7f2ab9",
              startTime: "21:00",
              endTime: "21:15",
              sunShine: 0,
            },
            {
              id: "6720c682-baf8-48ee-8378-e45699cc624e",
              startTime: "21:15",
              endTime: "21:30",
              sunShine: 0,
            },
            {
              id: "5defa0eb-ab45-4e58-b19d-72df83055655",
              startTime: "21:30",
              endTime: "21:45",
              sunShine: 0,
            },
            {
              id: "fde41576-f5e7-423d-83ad-18850ad98f56",
              startTime: "21:45",
              endTime: "22:00",
              sunShine: 0,
            },
            {
              id: "52c09365-be05-48c3-a286-a19f1ab779c1",
              startTime: "22:00",
              endTime: "22:15",
              sunShine: 0,
            },
          ],
        },
      ],
      createdAt: "2023-04-12 13:22:24",
      updatedAt: "2023-04-12 13:22:24",
    },
    {
      id: "1",
      name: "Outlet 2",
      houseNumber: 2,
      city: "Antwerpen",
      zipCode: 2000,
      category: "cafe",
      street: "Street 2",
      location: {
        type: "MultiPoint",
        coordinates: [51.2194475, 4.4024643],
      },
      openingHours: [
        {
          id: "1",
          weekday: "monday",
          openAt: "10:00",
          closesAt: "00:00",
          closesAtNextDay: true,
        },
        {
          id: "1",
          weekday: "tuesday",
          openAt: "10:00",
          closesAt: "00:00",
          closesAtNextDay: true,
        },
        {
          id: "1",
          weekday: "wednesday",
          openAt: "10:00",
          closesAt: "00:00",
          closesAtNextDay: true,
        },
        {
          id: "1",
          weekday: "thursday",
          openAt: "10:00",
          closesAt: "00:00",
          closesAtNextDay: true,
        },
        {
          id: "1",
          weekday: "friday",
          openAt: "10:00",
          closesAt: "00:00",
          closesAtNextDay: true,
        },
        {
          id: "1",
          weekday: "saturday",
          openAt: "10:00",
          closesAt: "00:00",
          closesAtNextDay: true,
        },
        {
          id: "1",
          weekday: "sunday",
          openAt: "10:00",
          closesAt: "00:00",
          closesAtNextDay: true,
        },
      ],
      sunlightHours: [
        {
          id: "05c96e62-2ac9-4aba-b67f-c3e4da39c1d4",
          startDate: "01/01/2022",
          endDate: "07/01/2022",
          outletSunlightHours: [
            {
              id: "4c621d4e-83c2-480f-9e70-a8e05c984563",
              startTime: "7:00",
              endTime: "7:15",
              sunShine: 0,
            },
            {
              id: "be1a5df3-3812-40e8-a05d-0ad812a89a1e",
              startTime: "7:15",
              endTime: "7:30",
              sunShine: 0,
            },
            {
              id: "29f2e736-84a6-4bbb-9a59-766f0c192500",
              startTime: "7:30",
              endTime: "7:45",
              sunShine: 0,
            },
            {
              id: "2524e060-f668-4781-82b5-ab445c205738",
              startTime: "7:45",
              endTime: "8:00",
              sunShine: 0,
            },
            {
              id: "ba0129e4-9e5e-4147-aa10-4f07f177aaba",
              startTime: "8:00",
              endTime: "8:15",
              sunShine: 0,
            },
            {
              id: "92a25fbf-2934-4587-8e3b-2f6fc410aad6",
              startTime: "8:15",
              endTime: "8:30",
              sunShine: 0,
            },
            {
              id: "f25b568e-374e-4af6-b064-5bc862905d40",
              startTime: "8:30",
              endTime: "8:45",
              sunShine: 0,
            },
            {
              id: "217ab8ef-492c-4d9b-a391-17ebb894da31",
              startTime: "8:45",
              endTime: "9:00",
              sunShine: 0,
            },
            {
              id: "a4734d5a-d2e7-4d43-92b4-1c6939ce851b",
              startTime: "9:00",
              endTime: "9:15",
              sunShine: 0,
            },
            {
              id: "378640f5-0bde-4a37-b0bb-f34756ac5486",
              startTime: "9:15",
              endTime: "9:30",
              sunShine: 0,
            },
            {
              id: "8373603e-76d9-446d-a6b1-492018b6d0fa",
              startTime: "9:30",
              endTime: "9:45",
              sunShine: 0,
            },
            {
              id: "f5db10e2-a7b1-496a-8bdf-25c8a0b9d559",
              startTime: "9:45",
              endTime: "10:00",
              sunShine: 1,
            },
            {
              id: "e23340df-a194-41b2-95b5-06ce11e9d45a",
              startTime: "10:00",
              endTime: "10:15",
              sunShine: 1,
            },
            {
              id: "b8bbde07-ed55-4b8d-a90d-a2e3e473fccb",
              startTime: "10:15",
              endTime: "10:30",
              sunShine: 4,
            },
            {
              id: "0e9d7fc7-d002-4680-a024-30c25cf1a771",
              startTime: "10:30",
              endTime: "10:45",
              sunShine: 4,
            },
            {
              id: "23944445-96f9-46e9-a5ae-51dcaa2df0aa",
              startTime: "10:45",
              endTime: "11:00",
              sunShine: 4,
            },
            {
              id: "6e75ef94-7f8e-4bfe-9f1f-9fde6b1b1e2c",
              startTime: "11:00",
              endTime: "11:15",
              sunShine: 4,
            },
            {
              id: "d4a90c83-83d9-4a7e-96a1-35401123d480",
              startTime: "11:15",
              endTime: "11:30",
              sunShine: 4,
            },
            {
              id: "a6c79483-504b-4e3d-9b74-52bb2a5e7a33",
              startTime: "11:30",
              endTime: "11:45",
              sunShine: 4,
            },
            {
              id: "3d37e7e4-3c9b-4019-b4e9-b58803ab348c",
              startTime: "11:45",
              endTime: "12:00",
              sunShine: 4,
            },
            {
              id: "aa008748-06eb-4152-8c76-b4496ad7ecc2",
              startTime: "12:00",
              endTime: "12:15",
              sunShine: 4,
            },
            {
              id: "1ff15c04-2fa8-48ac-864c-e667f22052f1",
              startTime: "12:15",
              endTime: "12:30",
              sunShine: 4,
            },
            {
              id: "ff5585e9-746e-4d3a-b07d-55f46264d830",
              startTime: "12:30",
              endTime: "12:45",
              sunShine: 4,
            },
            {
              id: "83ccec53-4d90-4824-92ed-6cafdb980d2e",
              startTime: "12:45",
              endTime: "13:00",
              sunShine: 4,
            },
            {
              id: "9ecf796b-c299-4e00-8ef0-db7b0e88a63e",
              startTime: "13:00",
              endTime: "13:15",
              sunShine: 4,
            },
            {
              id: "ad6d8889-b314-465d-af8c-9bb050284e04",
              startTime: "13:15",
              endTime: "13:30",
              sunShine: 4,
            },
            {
              id: "05821ca9-7161-4e5a-969d-ebe36f354bcf",
              startTime: "13:30",
              endTime: "13:45",
              sunShine: 3,
            },
            {
              id: "6b98b521-c990-49a2-bc2e-1032cf50cee2",
              startTime: "13:45",
              endTime: "14:00",
              sunShine: 3,
            },
            {
              id: "43e4f90d-69f5-4b5d-af4a-f8d86139b556",
              startTime: "14:00",
              endTime: "14:15",
              sunShine: 3,
            },
            {
              id: "7626efb2-12e7-4d29-bb80-4f4622ed86bc",
              startTime: "14:15",
              endTime: "14:30",
              sunShine: 2,
            },
            {
              id: "10f86043-f838-42fc-9c0f-665cafc4e958",
              startTime: "14:30",
              endTime: "14:45",
              sunShine: 0,
            },
            {
              id: "57e737cc-c5c1-407b-b196-8a737a73ecb7",
              startTime: "14:45",
              endTime: "15:00",
              sunShine: 0,
            },
            {
              id: "babd12f4-93a8-4665-8d83-32997160aae7",
              startTime: "15:00",
              endTime: "15:15",
              sunShine: 0,
            },
            {
              id: "ad297faf-91d0-496c-be5a-1a20d3ad97ff",
              startTime: "15:15",
              endTime: "15:30",
              sunShine: 0,
            },
            {
              id: "9ac21088-6b9d-4d9f-92ba-c1149ea6dc7f",
              startTime: "15:30",
              endTime: "15:45",
              sunShine: 0,
            },
            {
              id: "cb669fc4-3950-4c33-93f7-a4bb32b0446b",
              startTime: "15:45",
              endTime: "16:00",
              sunShine: 0,
            },
            {
              id: "4d385b20-da71-48d6-8065-7187b336ea28",
              startTime: "16:00",
              endTime: "16:15",
              sunShine: 0,
            },
            {
              id: "c6ae731f-d63b-4cd6-bbc9-6439c3d0d1af",
              startTime: "16:15",
              endTime: "16:30",
              sunShine: 0,
            },
            {
              id: "629d0df0-6386-4029-9b57-be7fce26be36",
              startTime: "16:30",
              endTime: "16:45",
              sunShine: 0,
            },
            {
              id: "e54cfdf2-9098-4591-85c3-fce00438d47a",
              startTime: "16:45",
              endTime: "17:00",
              sunShine: 0,
            },
            {
              id: "c77881b2-f22a-44e3-8a4c-32c354d130c5",
              startTime: "17:00",
              endTime: "17:15",
              sunShine: 0,
            },
            {
              id: "1f823fe3-38c8-461f-b0ba-901a89a93f31",
              startTime: "17:15",
              endTime: "17:30",
              sunShine: 0,
            },
            {
              id: "bc84c0cb-7cf3-40ee-8118-551f919f0972",
              startTime: "17:30",
              endTime: "17:45",
              sunShine: 0,
            },
            {
              id: "fa220f22-096d-42e1-986b-b3650dcdeac9",
              startTime: "17:45",
              endTime: "18:00",
              sunShine: 0,
            },
            {
              id: "fd06d577-f786-49fd-baba-1c1cbcddb35e",
              startTime: "18:00",
              endTime: "18:15",
              sunShine: 0,
            },
            {
              id: "c23ecd44-789f-4a43-a43f-f0e87c638a2c",
              startTime: "18:15",
              endTime: "18:30",
              sunShine: 0,
            },
            {
              id: "64e7c2b6-5d5a-4a32-97c4-1afcdaf8a242",
              startTime: "18:30",
              endTime: "18:45",
              sunShine: 0,
            },
            {
              id: "5d850abb-7e5c-46ec-8c27-aa0ed3089640",
              startTime: "18:45",
              endTime: "19:00",
              sunShine: 0,
            },
            {
              id: "eeb930d6-3c05-4070-b2d7-28acb968460b",
              startTime: "19:00",
              endTime: "19:15",
              sunShine: 0,
            },
            {
              id: "c3db2a16-166a-4a60-bf36-2d4f77ef7cbe",
              startTime: "19:15",
              endTime: "19:30",
              sunShine: 0,
            },
            {
              id: "c8b27608-fced-45fe-bedc-93d24a0d1841",
              startTime: "19:30",
              endTime: "19:45",
              sunShine: 0,
            },
            {
              id: "4c038ce0-609a-4190-85d5-60a762b5bcbf",
              startTime: "19:45",
              endTime: "20:00",
              sunShine: 0,
            },
            {
              id: "1f421f9c-9c01-4d4d-b088-4f935dbf448a",
              startTime: "20:00",
              endTime: "20:15",
              sunShine: 0,
            },
            {
              id: "945d7b0d-09e9-4af9-9134-a13867a8e5a5",
              startTime: "20:15",
              endTime: "20:30",
              sunShine: 0,
            },
            {
              id: "148e9249-5e4b-4e2c-bd9b-4384caa5acf4",
              startTime: "20:30",
              endTime: "20:45",
              sunShine: 0,
            },
            {
              id: "5b49cd46-7a89-4602-96c5-d9942a5fae9f",
              startTime: "20:45",
              endTime: "21:00",
              sunShine: 0,
            },
            {
              id: "b2ff3d12-fca3-4ef8-83ba-2c500f7f2ab9",
              startTime: "21:00",
              endTime: "21:15",
              sunShine: 0,
            },
            {
              id: "6720c682-baf8-48ee-8378-e45699cc624e",
              startTime: "21:15",
              endTime: "21:30",
              sunShine: 0,
            },
            {
              id: "5defa0eb-ab45-4e58-b19d-72df83055655",
              startTime: "21:30",
              endTime: "21:45",
              sunShine: 0,
            },
            {
              id: "fde41576-f5e7-423d-83ad-18850ad98f56",
              startTime: "21:45",
              endTime: "22:00",
              sunShine: 0,
            },
            {
              id: "52c09365-be05-48c3-a286-a19f1ab779c1",
              startTime: "22:00",
              endTime: "22:15",
              sunShine: 0,
            },
          ],
        },
      ],
      createdAt: "2023-04-12 13:22:24",
      updatedAt: "2023-04-12 13:22:24",
    },
  ];
};

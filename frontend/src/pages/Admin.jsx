import React, { useEffect } from 'react';
import { API_BACKEND } from '../API/api';
import { useAuthContext } from '../hooks/useAuthContext';
import { Bar, Pie } from "react-chartjs-2";
import { PiStudentFill } from "react-icons/pi";
import { IoPerson } from "react-icons/io5";
import { RiParentFill } from "react-icons/ri";
import { FaBusAlt } from "react-icons/fa";
import CalendarComponent from '../components/CalendarComponent';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { useStatistiquesContext } from '../hooks/useStatistiquesContext';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Admin = () => {
  const { user } = useAuthContext();
  const { statistiques, dispatch } = useStatistiquesContext();

  useEffect(() => {
    const fetchTotalStatistic = async () => {
      const response = await fetch(API_BACKEND + '/api/admin/statistique/total');
      const json = await response.json();

      if (response.ok) {
        dispatch({
          type: 'SET_TOTAL_STATISTIQUE',
          payload: {
            nbEtudiant: json.data.nbEtudiant,
            nbPersonnel: json.data.nbPersonnel,
            nbParents: json.data.nbParents,
            nbTransport: json.data.nbTransport
          }
        });
      }
    };

    const fetchTransportStatistic = async () => {
      const response = await fetch(API_BACKEND + '/api/admin/statistique/transport');
      const json = await response.json();

      if (response.ok) {
        dispatch({
          type: 'SET_TRANSPORT_STATISTIQUE',
          payload: {
            dataTransport: json.data
          }
        });
      }
    };

    fetchTotalStatistic();
    fetchTransportStatistic();
  }, [dispatch]);

  return (
    <>
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-solid rounded-lg dark:border-gray-700">
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="flex flex-col items-center justify-center h-24 rounded bg-blue-500 dark:bg-blue-800">
              <IoPerson className="text-4xl text-white mb-2" />
              <p className="text-2xl text-white">
                Total  Personnels: {statistiques.nbEtudiant}
              </p>
            </div>

            <div className="flex flex-col items-center justify-center h-24 rounded bg-yellow-400 dark:bg-yellow-600">
              <RiParentFill className="text-4xl text-white mb-2" />
              <p className="text-2xl text-white">
                Total Responsable : {statistiques.nbPersonnel}
              </p>
            </div>

           

            <div className="flex flex-col items-center justify-center h-24 rounded bg-green-400 dark:bg-green-600">
              <FaBusAlt className="text-4xl text-white mb-2" />
              <p className="text-2xl text-white">
                Total Transport : {statistiques.nbTransport}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4 mt-14">
            <div className="flex items-center justify-center rounded bg-gray-50 h-96 dark:bg-gray-800">
             
              <Pie
                data={{
                  labels: statistiques.dataTransport.map((data) => data.label),
                  datasets: [
                    {
                      label: "Count",
                      data: statistiques.dataTransport.map((data) => data.value),
                      backgroundColor: [
                        "rgba(255, 152, 0, 0.8)",
                        "rgba(76, 175, 80, 0.8)",
                        "rgba(43, 63, 229, 0.8)",
                        "rgba(250, 192, 135, 0.8)",
                        "rgba(156, 39, 176, 0.8)",
                        "rgba(33, 150, 243, 0.8)",
                        "rgba(255, 87, 34, 0.8)",
                        "rgba(63, 81, 181, 0.8)",
                        "rgba(255, 193, 7, 0.8)",
                        "rgba(233, 30, 99, 0.8)",
                      ],
                      borderRadius: 5,
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: 'top',
                    },
                    title: {
                      display: true,
                      text: 'Nombre Personnels Par Transport',
                    },
                  },
                }}
              />
            </div>
            <div className="flex items-center justify-center rounded bg-gray-50 h-96 dark:bg-gray-800">
            <div className="flex items-center justify-center rounded bg-gray-50 h-96 dark:bg-gray-800">
                <CalendarComponent />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;
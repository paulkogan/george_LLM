
import { Sequelize, QueryTypes, DataTypes, Model } from 'sequelize';
const Op = Sequelize.Op
import {models, sequelize} from "../models/index.js"



const runSQLQuery = async (query) => {

    const results = await sequelize.query(query, { type: QueryTypes.SELECT });

	if (!results) {
		console.log("No Results found")
	}
  
	return results

} 



export {runSQLQuery}








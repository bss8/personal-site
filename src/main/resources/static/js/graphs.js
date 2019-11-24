/*
 * Copyright (c) 2019. Borislav S. Sabotinov
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

$(document).ready(function () {
    let numVerticesInput = $('#numVertices');
    let biDirectionalSelect = $('#biDirectional');
    let connectVerticesBtn = $('#connectVerticesBtn');
    let runSimulationBtn = $('#runSimulationBtn');



    connectVerticesBtn.click(function () {
        let numVertices = numVerticesInput.val();
        let isBiDirectional = biDirectionalSelect.is(':checked');

        console.log("N: " + numVertices);
        console.log("isBiDirectional: " + isBiDirectional);


    });

    runSimulationBtn.click(function () {

    });

});